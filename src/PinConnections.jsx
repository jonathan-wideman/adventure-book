import { usePins } from "./hooks/queries/usePins";

export function PinConnections({ pin, connections }) {
  return (
    <div
      style={{
        // FIXME: x and y don't work with different sizes somehow; probably aspect ratio issue
        top: `${pin.y}%`,
        left: `${pin.x}%`,
        // filter: selected ? filterStyles.selected : filterStyles.unselected,
      }}
      className={"absolute select-none"}
    >
      {connections.map((connection, index) => (
        // <PinConnection key={connection.id} pin={pin} connection={connection} />
        // <div key={index}>connection</div>
        <Connection key={index} pin={pin} connection={connection} />
        // <Line
        //   key={index}
        //   start={{ x: 0, y: 0 }}
        //   end={{ x: pin.x + 10, y: pin.y + 10 }}
        // />
      ))}
    </div>
  );
}

export function Connection({ pin, connection }) {
  const pins = usePins();
  // console.log("pin", pin, "connection", connection);
  const connectedPin = pins?.data?.find((p) => p.id === connection);
  const start = { x: 0, y: 0 };
  const end = { x: connectedPin.x - pin.x, y: connectedPin.y - pin.y };
  // console.log("start", start, "end", end);

  return <Line start={start} end={end} />;
}

const SCALE = 1280;

export function Line({ start, end }) {
  return (
    <svg height="320" width="320" className="absolute left-0 top-0">
      <line
        // x1={0}
        // y1={0}
        // x2={20}
        // y2={20}
        x1={start.x * SCALE}
        y1={start.y * SCALE}
        x2={end.x * SCALE}
        y2={end.y * SCALE}
        style={{ stroke: "black", strokeWidth: 1 }}
      />
    </svg>
  );
}
