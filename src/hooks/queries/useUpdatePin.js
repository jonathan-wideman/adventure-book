import { useMutation, useQueryClient } from "@tanstack/react-query";
import { dbUrl } from "../../api";

export const useUpdatePin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ pin, newPosition }) => {
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
      queryClient.setQueryData(["pins"], (prev) =>
        prev.map((pin) => (pin.id === updatedPin.id ? updatedPin : pin))
      );
    },
  });
};
