import { useState } from "react";
import { useEffect } from "react";
import Markdown from "react-markdown";
import { useUpdateLocation } from "./hooks/queries/useUpdateLocation";
import { DEFAULT_TOOL_MODE } from "./AdventureBook";
import { useDeletePin } from "./hooks/queries/useDeletePin";

export function Location({ location, pin, deselect, toolMode, setToolMode }) {
  const [name, setName] = useState(location.name);
  const [content, setContent] = useState(location.content);

  const updateLocation = useUpdateLocation();
  const deletePin = useDeletePin();

  useEffect(() => {
    resetForm();
  }, [location]);

  const resetForm = () => {
    setName(location.name);
    setContent(location.content);
  };

  const saveForm = () => {
    updateLocation.mutate({
      id: location.id,
      name,
      content,
    });
    setToolMode(DEFAULT_TOOL_MODE);
  };

  const closeForm = () => {
    deselect();
    resetForm();
    setToolMode(DEFAULT_TOOL_MODE);
  };

  const enterEditMode = () => {
    setToolMode("edit");
  };

  const cancelEditMode = () => {
    resetForm();
    setToolMode(DEFAULT_TOOL_MODE);
  };

  const enterMoveMode = () => {
    setToolMode("move");
    resetForm();
  };

  const cancelMoveMode = () => {
    setToolMode(DEFAULT_TOOL_MODE);
  };

  const enterPlaceMode = () => {
    setToolMode("place");
  };

  const cancelPlaceMode = () => {
    setToolMode(DEFAULT_TOOL_MODE);
  };

  const deletePinClicked = (pinId) => {
    console.log("delete pin");
    deletePin.mutate({ pinId });
    setToolMode(DEFAULT_TOOL_MODE);
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
            {pin ? (
              <button onClick={() => enterMoveMode()}>Move</button>
            ) : (
              <button onClick={() => enterPlaceMode()}>Place</button>
            )}
            <button onClick={() => enterEditMode()}>Edit</button>
            <button onClick={() => closeForm()}>Close</button>
          </div>
        </>
      ) : null}

      {toolMode === "move" ? (
        <>
          <div>
            <h4>{location.name}</h4>
            Move from ({pin.x}, {pin.y})
          </div>
          <div
            style={{ display: "flex", justifyContent: "center", gap: "0.5rem" }}
          >
            <button onClick={() => deletePinClicked(pin.id)}>Delete</button>
            <button onClick={() => cancelMoveMode()}>Cancel</button>
          </div>
        </>
      ) : null}

      {toolMode === "place" ? (
        <>
          <div>
            <h4>{location.name}</h4>
            Place
          </div>
          <div
            style={{ display: "flex", justifyContent: "center", gap: "0.5rem" }}
          >
            <button onClick={() => cancelPlaceMode()}>Cancel</button>
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
