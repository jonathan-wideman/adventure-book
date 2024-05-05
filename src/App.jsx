import { useState } from "react";
import reactLogo from "./assets/react.svg";
import mapImage from "./assets/map.png";
import viteLogo from "/vite.svg";
import "./App.css";
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import Draggable from "react-draggable";
import PinIcon from "./icons/PinIcon";
import { useFloating, useHover, useInteractions } from "@floating-ui/react";
import { useEffect } from "react";
import Markdown from "react-markdown";

const dbUrl = "http://localhost:8000";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AdventureBook />
    </QueryClientProvider>
  );
}

function AdventureBook() {
  const locations = useQuery({
    queryKey: ["locations"],
    queryFn: () => fetch(`${dbUrl}/locations`).then((res) => res.json()),
  });

  const pins = useQuery({
    queryKey: ["pins"],
    queryFn: () => fetch(`${dbUrl}/pins`).then((res) => res.json()),
  });

  const [selectedPin, setSelectedPin] = useState(null);

  const addLocation = () => {
    console.log("addLocation");
  };

  if (locations.isLoading || pins.isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h3>Adventure Book</h3>

      <Map
        locations={locations}
        pins={pins}
        selectedPin={selectedPin}
        setSelectedPin={setSelectedPin}
      />

      <div>
        {selectedPin ? (
          <Location
            location={locations.data.find((loc) => loc.id === selectedPin)}
            deslectPin={() => setSelectedPin(null)}
          />
        ) : (
          <button onClick={() => addLocation()}>Add Location</button>
        )}
      </div>
      {/* <div>
        {locations.data?.map((location) => (
          <Location
            key={location.id}
            location={location}
            pin={pins.data?.find((pin) => pin.locationId === location.id)}
          />
        ))}
      </div> */}
    </>
  );
}

function Location({ location, pin, deslectPin }) {
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
            {/* <p>{location.content}</p> */}
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

const useUpdateLocationMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, name, content }) => {
      return fetch(`${dbUrl}/locations/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, content }),
      }).then((response) => response.json());
    },
    onSuccess: (updatedLocation, variables) => {
      console.log(
        "updateLocationMutation onSuccess",
        updatedLocation,
        variables,
        queryClient.getQueryData(["locations"])
      );
      queryClient.setQueryData(["locations"], (prev) =>
        prev.map((location) =>
          location.id === updatedLocation.id ? updatedLocation : location
        )
      );
    },
  });
};

const useUpdatePinMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ pin, newPosition }) => {
      // console.log("updatePinPositionMutation mutate", { pin, newPosition });
      if (!pin || !newPosition) {
        throw new Error("No selected pin or new position");
      }
      return fetch(`${dbUrl}/pins/${pin.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPosition),
      }).then((response) => response.json());
    },
    onSuccess: (updatedPin, variables) => {
      console.log(
        "updatePinPositionMutation onSuccess",
        updatedPin,
        variables,
        queryClient.getQueryData(["pins"])
      );
      queryClient.setQueryData(["pins"], (prev) =>
        prev.map((pin) => (pin.id === updatedPin.id ? updatedPin : pin))
      );
    },
  });
};

function Map({ locations, pins, selectedPin, setSelectedPin }) {
  // const [selectedPin, setSelectedPin] = useState(null);

  const updatePinPositionMutation = useUpdatePinMutation();

  const onClickMap = (e) => {
    // Get the bounding rectangle of target
    const rect = e.target.getBoundingClientRect();
    // Mouse position
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    updatePinPositionMutation.mutate({
      pin: pins?.data.find((pin) => pin.id === selectedPin),
      newPosition: { x, y },
    });
    setSelectedPin(null);
  };

  const selectPin = (pin) => {
    setSelectedPin((prev) => (prev === pin ? null : pin));
  };

  return (
    <div style={{ width: "100%", position: "relative" }} onClick={onClickMap}>
      <img src={mapImage} alt="map" style={{ width: "100%" }} />
      {pins.data?.map((pin) => (
        <MapPin
          key={pin.id}
          pin={pin}
          location={locations.data?.find(
            (location) => location.id === pin.locationId
          )}
          selectPin={selectPin}
          selected={pin.id === selectedPin}
        />
      ))}
    </div>
  );
}

function MapPin({ pin, location, selectPin, selected }) {
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
        // onMouseOver={() => setShowLocation(true)}
        // onMouseOut={() => setShowLocation(false)}
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

export default App;
