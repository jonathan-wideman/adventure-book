import { useState } from "react";
import PinIcon from "./icons/PinIcon";
import { useFloating, useHover, useInteractions } from "@floating-ui/react";
import { PinMarker } from "./PinMarker";

export const filterStyles = {
  selected:
    "drop-shadow(2px 2px 2px hsla(0, 0%, 0%, 0.5)) drop-shadow(0 0 15px white) drop-shadow(0 0 10px white) drop-shadow(0 0 5px white)",
  unselected:
    "drop-shadow(2px 2px 2px hsla(0, 0%, 0%, 0.5)) drop-shadow(0 0 5px white)",
};

export function MapPin({ pin, location, onSelect, selected, ghost = false }) {
  const [isOpen, setIsOpen] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    placement: "top",
    open: isOpen,
    onOpenChange: setIsOpen,
  });

  const hover = useHover(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([hover]);

  if (ghost) {
    return (
      <PinMarker
        color="hsla(0, 0%, 0%, 0.3)"
        x={pin.x}
        y={pin.y}
        disablePointerEvents
      />
    );
  }

  return (
    <>
      <div
        style={{
          // FIXME: x and y don't work with different sizes somehow; probably aspect ratio issue
          top: `${pin.y}%`,
          left: `${pin.x}%`,
          filter: selected ? filterStyles.selected : filterStyles.unselected,
        }}
        className={
          "absolute cursor-pointer select-none" +
          (selected ? " text-zinc-100" : " text-zinc-800")
        }
        onClick={(e) => {
          e.stopPropagation();
          onSelect();
        }}
      >
        <div
          className="absolute bottom-[-0.2rem] left-[-0.5rem] w-4 text-center"
          ref={refs.setReference}
          {...getReferenceProps()}
        >
          <PinIcon />
        </div>
      </div>
      {isOpen ? (
        <div
          ref={refs.setFloating}
          style={{
            filter: selected ? filterStyles.selected : filterStyles.unselected,
            ...floatingStyles,
          }}
          className="bg-zinc-800 font-bold"
          {...getFloatingProps()}
        >
          {location.name}
        </div>
      ) : null}
    </>
  );
}
