import PinIcon from "./icons/PinIcon";

export function PinMarker({ color, x, y, disablePointerEvents = false }) {
  return (
    <div
      style={{
        position: "absolute",
        // FIXME: x and y don't work with different sizes somehow; probably aspect ratio issue
        top: `${y}%`,
        left: `${x}%`,
        userSelect: "none",
        color: color,
        pointerEvents: disablePointerEvents ? "none" : "auto",
        filter:
          "drop-shadow(2px 2px 2px hsla(0, 0%, 0%, 0.5)) drop-shadow(0 0 5px white)",
      }}
    >
      <div
        style={{
          position: "absolute",
          bottom: "-0.2rem",
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
