import { useMutation, useQueryClient } from "@tanstack/react-query";
import { dbUrl } from "../../api";

export const useAddLocation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => {
      return fetch(`${dbUrl}/locations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "New Location",
          content: "Placeholder description.",
        }),
      })
        .then((response) => response.json())
        .then((newLocation) => {
          return fetch(`${dbUrl}/pins`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: newLocation.id,
              locationId: newLocation.id,
              x: 0,
              y: 0,
            }),
          })
            .then((response) => response.json())
            .then((newPin) => ({ newLocation, newPin }));
        });
    },
    onSuccess: ({ newLocation, newPin }, variables) => {
      queryClient.setQueryData(["locations"], (prev) => [...prev, newLocation]);
      queryClient.setQueryData(["pins"], (prev) => [...prev, newPin]);
    },
  });
};
