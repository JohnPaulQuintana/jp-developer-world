import { useEffect, useState } from "react";
import { Html } from "@react-three/drei";

type NPCDialogueProps = {
  name: string;
  message: string;
  visible: boolean;
};

export default function NPCDialogue({
  name,
  message,
  visible,
}: NPCDialogueProps) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    if (!visible) {
      setDisplayed("");
      return;
    }

    setDisplayed("");
    let index = 0;

    const interval = window.setInterval(() => {
      index += 1;
      setDisplayed(message.slice(0, index));

      if (index >= message.length) {
        window.clearInterval(interval);
      }
    }, 24);

    return () => window.clearInterval(interval);
  }, [message, visible]);

  if (!visible) return null;

  return (
    <Html
      position={[0, 5, 0]}
      center
      distanceFactor={10}
      zIndexRange={[100, 0]}
      style={{
        pointerEvents: "none",
        userSelect: "none",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "165px",
          maxWidth: "55vw",
          boxSizing: "border-box",
          padding: "8px 10px",
          border: "1px solid rgba(123, 216, 143, 0.65)",
          borderRadius: "9px",
          background: "rgba(9, 22, 14, 0.97)",
          color: "#f2f5ef",
          boxShadow: "0 3px 12px rgba(0,0,0,0.28)",
          fontFamily: "system-ui, sans-serif",
          whiteSpace: "normal",
          overflowWrap: "anywhere",
        }}
      >
        <div
          style={{
            color: "#7bd88f",
            fontSize: "9px",
            fontWeight: 800,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            marginBottom: "4px",
          }}
        >
          {name}
        </div>

        <div
          style={{
            fontSize: "11px",
            lineHeight: 1.45,
          }}
        >
          {displayed}
          {displayed.length < message.length && (
            <span style={{ color: "#7bd88f" }}>▌</span>
          )}
        </div>

        <div
          style={{
            position: "absolute",
            bottom: "-5px",
            left: "calc(50% - 5px)",
            width: "9px",
            height: "9px",
            background: "#09160e",
            borderRight: "1px solid rgba(123, 216, 143, 0.65)",
            borderBottom: "1px solid rgba(123, 216, 143, 0.65)",
            transform: "rotate(45deg)",
          }}
        />
      </div>
    </Html>
  );
}