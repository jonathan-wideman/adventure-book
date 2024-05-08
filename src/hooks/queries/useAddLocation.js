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
      }).then((response) => response.json());
    },
    onSuccess: (newLocation, variables) => {
      queryClient.setQueryData(["locations"], (prev) => [...prev, newLocation]);
    },
  });
};
