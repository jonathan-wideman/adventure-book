import { useState } from "react";
import { useEffect } from "react";
import Markdown from "react-markdown";
import { useUpdateLocation } from "./hooks/queries/useUpdateLocation";

export function Location({ location, pin, deslectPin, toolMode, setToolMode }) {
  const [name, setName] = useState(location.name);
  const [content, setContent] = useState(location.content);

  const updateLocation = useUpdateLocation();

  useEffect(() => {
    resetForm();
  }, [location]);

  const resetForm = () => {
    setName(location.name);
    setContent(location.content);
  };

  const saveForm = () => {
    console.log("saveForm", name, content);

    updateLocation.mutate({
      id: location.id,
      name,
      content,
    });

    setToolMode("select");
  };

  const closeForm = () => {
    deslectPin();
    resetForm();
    setToolMode("select");
  };

  const enterEditMode = () => {
    setToolMode("edit");
  };

  const cancelEditMode = () => {
    resetForm();
    setToolMode("select");
  };

  const enterMoveMode = () => {
    setToolMode("move");
    resetForm();
  };

  const cancelMoveMode = () => {
    setToolMode("select");
  };

  return (
    <div
      style={{
        maxWidth: "720px",
        display: "flex",
        flexDirection: "column",
        margin: "0 auto",
      }}
    >
      {toolMode === "select" ? (
        <>
          <div>
            <h4>{location.name}</h4>
            <Markdown>{location.content}</Markdown>
          </div>

          <div
            style={{ display: "flex", justifyContent: "center", gap: "0.5rem" }}
          >
            <button onClick={() => enterMoveMode()}>Move</button>
            <button onClick={() => enterEditMode()}>Edit</button>
            <button onClick={() => closeForm()}>Close</button>
          </div>
        </>
      ) : null}

      {toolMode === "move" ? (
        <>
          <h4>{location.name}</h4>
          <div>
            Moving from ({pin.x}, {pin.y})
          </div>
          <div
            style={{ display: "flex", justifyContent: "center", gap: "0.5rem" }}
          >
            <button onClick={() => cancelMoveMode()}>Cancel</button>
            <button onClick={() => closeForm()}>Close</button>
          </div>
        </>
      ) : null}

      {toolMode === "edit" ? (
        <>
          <h4>Location - Edit Mode</h4>
          <div>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ width: "100%" }}
            />
          </div>
          <div>
            <textarea
              cols={40}
              rows={10}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              style={{ width: "100%" }}
            ></textarea>
          </div>

          <div
            style={{ display: "flex", justifyContent: "center", gap: "0.5rem" }}
          >
            <button onClick={() => resetForm()}>Reset</button>
            <button onClick={() => cancelEditMode()}>Cancel</button>
            <button onClick={() => saveForm()}>Save</button>
          </div>
        </>
      ) : null}
    </div>
  );
}
