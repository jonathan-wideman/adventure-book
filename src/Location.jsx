import { useState } from "react";
import { useEffect } from "react";
import Markdown from "react-markdown";
import { useUpdateLocation } from "./hooks/queries/useUpdateLocation";
import { DEFAULT_TOOL_MODE } from "./AdventureBook";
import { useDeletePin } from "./hooks/queries/useDeletePin";
import { useDeleteLocation } from "./hooks/queries/useDeleteLocation";
import { Button } from "./components/ui/button";
import { Textarea } from "./components/ui/textarea";
import { Input } from "./components/ui/input";

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
              <Button onClick={() => enterMoveMode()}>Move</Button>
            ) : (
              <Button onClick={() => enterPlaceMode()}>Place</Button>
            )}
            <Button onClick={() => enterEditMode()}>Edit</Button>
            <Button onClick={() => closeForm()}>Close</Button>
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
            <Button onClick={() => onClickDeletePin(pin.id)}>Delete</Button>
            <Button onClick={() => cancelMoveMode()}>Cancel</Button>
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
            <Button onClick={() => cancelPlaceMode()}>Cancel</Button>
          </div>
        </>
      ) : null}

      {toolMode === "edit" ? (
        <>
          <h4>Location - Edit Mode</h4>
          <div>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full"
            />
          </div>
          <div>
            <Textarea
              cols={40}
              rows={10}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full"
            ></Textarea>
          </div>

          <div className="flex justify-center gap-2">
            <Button onClick={() => onClickDeleteLocation(location.id)}>
              Delete
            </Button>
            <Button onClick={() => cancelEditMode()}>Cancel</Button>
            <Button onClick={() => saveForm()}>Save</Button>
          </div>
        </>
      ) : null}
    </div>
  );
}
