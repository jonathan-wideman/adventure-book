import PinIcon from "./icons/PinIcon";

export function PinMarker({ color, x, y, disablePointerEvents = false }) {
  return (
    <div
      style={{
        position: "absolute",
        // FIXME: x and y don't work with different sizes somehow
        top: `${y}%`,
        left: `${x}%`,
        userSelect: "none",
        color: color,
        pointerEvents: disablePointerEvents ? "none" : "auto",
      }}
    >
      <div
        style={{
          position: "absolute",
          bottom: "-0.4rem",
          left: "-0.5rem",
          width: "1rem",
          textAlign: "center",
        }}
      >
        <PinIcon />
      </div>
    </div>
  );
}
