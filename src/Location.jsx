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
            <h2 className="text-lg font-bold p-4">{location.name}</h2>
            <Markdown>{location.content}</Markdown>
          </div>
          <div className="flex justify-center gap-2">
            {pin ? (
              <Button onClick={() => enterMoveMode()} variant="secondary">
                Move
              </Button>
            ) : (
              <Button onClick={() => enterPlaceMode()} variant="secondary">
                Place
              </Button>
            )}
            <Button onClick={() => enterEditMode()} variant="secondary">
              Edit
            </Button>
            <Button onClick={() => closeForm()} variant="secondary">
              Close
            </Button>
          </div>
        </>
      ) : null}

      {toolMode === "move" ? (
        <>
          <div>
            <h2 className="text-lg font-bold p-4">{location.name}</h2>
            Move from ({pin.x}, {pin.y})
          </div>
          <div className="flex justify-center gap-2">
            <Button
              onClick={() => onClickDeletePin(pin.id)}
              variant="secondary"
            >
              Delete
            </Button>
            <Button onClick={() => cancelMoveMode()} variant="secondary">
              Cancel
            </Button>
          </div>
        </>
      ) : null}

      {toolMode === "place" ? (
        <>
          <div>
            <h2 className="text-lg font-bold p-4">{location.name}</h2>
            Place
          </div>
          <div className="flex justify-center gap-2">
            <Button onClick={() => cancelPlaceMode()} variant="secondary">
              Cancel
            </Button>
          </div>
        </>
      ) : null}

      {toolMode === "edit" ? (
        <>
          <h2 className="text-lg font-bold p-4">{location.name}</h2>
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
            <Button
              onClick={() => onClickDeleteLocation(location.id)}
              variant="secondary"
            >
              Delete
            </Button>
            <Button onClick={() => cancelEditMode()} variant="secondary">
              Cancel
            </Button>
            <Button onClick={() => saveForm()} variant="secondary">
              Save
            </Button>
          </div>
        </>
      ) : null}
    </div>
  );
}
