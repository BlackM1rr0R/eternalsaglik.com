"""Deploy the production build to the server.

Usage:  npm run build && npm run deploy      (needs: pip install paramiko)

Reads server_host / server_user / server_password (or server_key) from .env,
uploads build/ as a tarball, keeps the previous release as a backup and swaps
the new one into /var/www/eternal in a single move. Roll back with:
    python scripts/deploy.py --rollback
"""
import io
import os
import sys
import tarfile
import time

import paramiko

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BUILD = os.path.join(ROOT, "build")
TARGET = "/var/www/eternal"
KEEP_BACKUPS = 3


def load_env():
    env = {}
    with open(os.path.join(ROOT, ".env"), encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            if not line or line.startswith("#"):
                continue
            sep = ":" if ":" in line and ("=" not in line or line.index(":") < line.index("=")) else "="
            key, value = line.split(sep, 1)
            env[key.strip()] = value.strip()
    return env


def run(ssh, cmd):
    _, out, err = ssh.exec_command(cmd, timeout=300)
    code = out.channel.recv_exit_status()
    text = out.read().decode() + err.read().decode()
    if code != 0:
        raise SystemExit(f"Remote command failed ({code}): {cmd}\n{text}")
    return text


def connect(env):
    ssh = paramiko.SSHClient()
    ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    kwargs = {"username": env.get("server_user", "root"), "timeout": 20}
    if env.get("server_key"):
        kwargs["key_filename"] = env["server_key"]
    else:
        kwargs["password"] = env["server_password"]
    ssh.connect(env["server_host"], **kwargs)
    return ssh


def rollback(ssh):
    latest = run(ssh, f"ls -1dt {TARGET}.bak-* 2>/dev/null | head -1").strip()
    if not latest:
        raise SystemExit("No backup to roll back to.")
    stamp = time.strftime("%Y%m%d-%H%M%S")
    run(ssh, f"mv {TARGET} {TARGET}.failed-{stamp} && mv {latest} {TARGET}")
    print(f"Rolled back to {latest}")


def deploy(ssh):
    if not os.path.isfile(os.path.join(BUILD, "index.html")):
        raise SystemExit("build/index.html not found. Run `npm run build` first.")

    buf = io.BytesIO()
    with tarfile.open(fileobj=buf, mode="w:gz") as tar:
        tar.add(BUILD, arcname=".")
    buf.seek(0)
    size_kb = len(buf.getvalue()) // 1024

    stamp = time.strftime("%Y%m%d-%H%M%S")
    remote_tar = f"/tmp/eternal-{stamp}.tgz"
    sftp = ssh.open_sftp()
    sftp.putfo(buf, remote_tar)
    sftp.close()
    print(f"Uploaded {size_kb} KB")

    new_dir = f"{TARGET}.new-{stamp}"
    run(ssh, f"mkdir -p {new_dir} && tar -xzf {remote_tar} -C {new_dir} && rm -f {remote_tar}")
    run(ssh, f"test -f {new_dir}/index.html")
    run(ssh, f"chown -R www-data:www-data {new_dir} 2>/dev/null || true; chmod -R a+rX {new_dir}")
    run(ssh, f"if [ -d {TARGET} ]; then mv {TARGET} {TARGET}.bak-{stamp}; fi && mv {new_dir} {TARGET}")
    run(ssh, f"ls -1dt {TARGET}.bak-* 2>/dev/null | tail -n +{KEEP_BACKUPS + 1} | xargs -r rm -rf")
    print(f"Deployed to {TARGET} (backup: {TARGET}.bak-{stamp})")


if __name__ == "__main__":
    client = connect(load_env())
    try:
        rollback(client) if "--rollback" in sys.argv else deploy(client)
    finally:
        client.close()
