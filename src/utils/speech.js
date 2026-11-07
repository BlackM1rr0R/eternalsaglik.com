// Text-to-speech with the browser's built-in voices (no external service).
export const canSpeak = () => typeof window !== "undefined" && "speechSynthesis" in window;

export const speak = (text, { lang = "tr-TR", onEnd } = {}) => {
  if (!canSpeak()) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = lang;
  u.rate = 0.95;
  const voice = window.speechSynthesis.getVoices().find((v) => v.lang?.startsWith(lang.slice(0, 2)));
  if (voice) u.voice = voice;
  u.onend = onEnd;
  u.onerror = onEnd;
  window.speechSynthesis.speak(u);
};

export const stopSpeaking = () => canSpeak() && window.speechSynthesis.cancel();
