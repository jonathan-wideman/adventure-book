import { useMutation, useQueryClient } from "@tanstack/react-query";
import { dbUrl } from "../../api";

export const useAddPin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ locationId, x, y }) => {
      return fetch(`${dbUrl}/pins`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: locationId,
          locationId,
          x,
          y,
        }),
      }).then((response) => response.json());
    },
    onSuccess: (newPin, variables) => {
      queryClient.setQueryData(["pins"], (prev) => [...prev, newPin]);
    },
  });
};
