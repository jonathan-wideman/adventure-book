import { filterStyles } from "./MapPin";
import PinIcon from "./icons/PinIcon";

export function PinMarker({ color, x, y, disablePointerEvents = false }) {
  return (
    <div
      style={{
        // FIXME: x and y don't work with different sizes somehow; probably aspect ratio issue
        top: `${y}%`,
        left: `${x}%`,
        color: color,
        pointerEvents: disablePointerEvents ? "none" : "auto",
        filter: filterStyles.unselected,
      }}
      className={"absolute select-none"}
    >
      <div className="absolute bottom-[-0.2rem] left-[-0.5rem] w-4 text-center">
        <PinIcon />
      </div>
    </div>
  );
}
