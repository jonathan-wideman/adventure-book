import { useState } from "react";
import { useEffect } from "react";
import Markdown from "react-markdown";
import { useUpdateLocationMutation } from "./hooks/queries/useUpdateLocationMutation";

export function Location({ location, pin, deslectPin }) {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(location.name);
  const [content, setContent] = useState(location.content);

  const updateLocationMutation = useUpdateLocationMutation();

  useEffect(() => {
    setEditing(false);
    resetForm();
  }, [location]);

  const resetForm = () => {
    setName(location.name);
    setContent(location.content);
  };

  const saveForm = () => {
    console.log("saveForm", name, content);

    updateLocationMutation.mutate({
      id: location.id,
      name,
      content,
    });

    setEditing(false);
  };

  const closeForm = () => {
    deslectPin();
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
      {!editing ? (
        <>
          <div>
            <h4>
              {location.name}
              {pin ? (
                <>
                  {" "}
                  ({pin.x}, {pin.y})
                </>
              ) : null}
            </h4>
            <Markdown>{location.content}</Markdown>
          </div>
          <div
            style={{ display: "flex", justifyContent: "center", gap: "0.5rem" }}
          >
            <button onClick={() => setEditing(true)}>Edit</button>
            <button onClick={() => closeForm()}>Close</button>
          </div>
        </>
      ) : (
        <>
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
            <button onClick={() => setEditing(false)}>Cancel</button>
            <button onClick={() => saveForm()}>Save</button>
          </div>
        </>
      )}
    </div>
  );
}
