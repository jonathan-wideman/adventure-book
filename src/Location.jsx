import { useState } from "react";
import { useEffect } from "react";
import Markdown from "react-markdown";
import { useUpdateLocation } from "./hooks/queries/useUpdateLocation";
import { DEFAULT_TOOL_MODE } from "./AdventureBook";
import { useDeletePin } from "./hooks/queries/useDeletePin";
import { useDeleteLocation } from "./hooks/queries/useDeleteLocation";

export function Location({ location, pin, deselect, toolMode, setToolMode }) {
  const [name, setName] = useState(location.name);
  const [content, setContent] = useState(location.content);

  const updateLocation = useUpdateLocation();
  const deletePin = useDeletePin();
  const deleteLocation = useDeleteLocation();

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

  const onClickDeletePin = (pinId) => {
    deletePin.mutate({ pinId });
    setToolMode(DEFAULT_TOOL_MODE);
  };

  const onClickDeleteLocation = (locationId) => {
    deleteLocation.mutate({ locationId });
    setToolMode(DEFAULT_TOOL_MODE);
    deselect();
  };

  return (
    <div className="flex flex-col max-w-3xl my-0 mx-auto">
      {toolMode === "select" ? (
        <>
          <div>
            <h4>{location.name}</h4>
            <Markdown>{location.content}</Markdown>
          </div>

          <div className="flex justify-center gap-2">
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
          <div className="flex justify-center gap-2">
            <button onClick={() => onClickDeletePin(pin.id)}>Delete</button>
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
          <div className="flex justify-center gap-2">
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
              className="w-full"
            />
          </div>
          <div>
            <textarea
              cols={40}
              rows={10}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full"
            ></textarea>
          </div>

          <div className="flex justify-center gap-2">
            <button onClick={() => onClickDeleteLocation(location.id)}>
              Delete
            </button>
            <button onClick={() => cancelEditMode()}>Cancel</button>
            <button onClick={() => saveForm()}>Save</button>
          </div>
        </>
      ) : null}
    </div>
  );
}
