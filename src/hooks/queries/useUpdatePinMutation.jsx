import { useMutation, useQueryClient } from "@tanstack/react-query";
import { dbUrl } from "../../api";

export const useUpdatePinMutation = () => {
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
