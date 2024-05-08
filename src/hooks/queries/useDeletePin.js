import { useMutation, useQueryClient } from "@tanstack/react-query";
import { dbUrl } from "../../api";

export const useDeletePin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ pinId }) => {
      return fetch(`${dbUrl}/pins/${pinId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((response) => response.json());
    },
    onSuccess: (deletedPin, variables) => {
      console.log("deleted", deletedPin);
      queryClient.setQueryData(["pins"], (prev) =>
        prev.filter((pin) => pin.id !== deletedPin.id)
      );
    },
  });
};
