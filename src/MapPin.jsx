import { useState } from "react";
import PinIcon from "./icons/PinIcon";
import { useFloating, useHover, useInteractions } from "@floating-ui/react";

export function MapPin({ pin, location, selectPin, selected }) {
  // const [showLocation, setShowLocation] = useState(false);
  // const { refs, floatingStyles } = useFloating();
  const [isOpen, setIsOpen] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    placement: "top",
    open: isOpen,
    onOpenChange: setIsOpen,
  });

  const hover = useHover(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([hover]);

  return (
    <>
      <div
        style={{
          position: "absolute",
          top: pin.y,
          left: pin.x,
          userSelect: "none",
          cursor: "pointer",
          color: selected ? "white" : "black",
          // textShadow: selected
          //   ? "2px 2px 5px black, 0 0 15px white, 0 0 10px white, 0 0 5px white"
          //   : "2px 2px 5px black, 0 0 5px white",
          filter: selected
            ? "drop-shadow(2px 2px 2px hsla(0, 0%, 0%, 0.5)) drop-shadow(0 0 15px white) drop-shadow(0 0 10px white) drop-shadow(0 0 5px white)"
            : "drop-shadow(2px 2px 2px hsla(0, 0%, 0%, 0.5)) drop-shadow(0 0 5px white)",
        }}
        onClick={(e) => {
          e.stopPropagation();
          selectPin(pin.id);
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
          ref={refs.setReference}
          {...getReferenceProps()}
        >
          <PinIcon />
          {/* <div
            style={{
              position: "absolute",
              top: "-100%",
              left: "-50%",
              width: "max-content",
              textAlign: "center",
              color: "black",
            }}
          >
            {showLocation && <>{location.name}</>}
          </div> */}
        </div>
      </div>
      {isOpen ? (
        <div
          ref={refs.setFloating}
          style={{
            color: "black",
            fontWeight: "bold",
            filter: selected
              ? "drop-shadow(2px 2px 2px hsla(0, 0%, 0%, 0.5)) drop-shadow(0 0 15px white) drop-shadow(0 0 10px white) drop-shadow(0 0 5px white)"
              : "drop-shadow(2px 2px 2px hsla(0, 0%, 0%, 0.5)) drop-shadow(0 0 5px white)",
            ...floatingStyles,
          }}
          {...getFloatingProps()}
        >
          {location.name}
        </div>
      ) : null}
    </>
  );
}
