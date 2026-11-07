import React, { useEffect, useState } from "react";
import { FaVolumeUp, FaStop } from "react-icons/fa";
import { canSpeak, speak, stopSpeaking } from "../../utils/speech";

// "Dinle" button: reads the given text aloud with the browser's Turkish voice.
const ListenButton = ({ text, lang = "tr-TR", label = "Dinle", stopLabel = "Durdur" }) => {
  const [playing, setPlaying] = useState(false);
  useEffect(() => () => stopSpeaking(), []);
  if (!canSpeak() || !text) return null;

  const toggle = () => {
    if (playing) {
      stopSpeaking();
      setPlaying(false);
      return;
    }
    setPlaying(true);
    speak(text, { lang, onEnd: () => setPlaying(false) });
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={playing}
      style={{
        display: "inline-flex", alignItems: "center", gap: 8, padding: "10px 18px", marginTop: 12, alignSelf: "flex-start", width: "fit-content",
        borderRadius: 999, border: "1.5px solid var(--border)", background: "var(--surface)",
        color: "var(--text)", font: "inherit", fontWeight: 600, cursor: "pointer",
      }}
    >
      {playing ? <FaStop /> : <FaVolumeUp />} {playing ? stopLabel : label}
    </button>
  );
};

export default ListenButton;
