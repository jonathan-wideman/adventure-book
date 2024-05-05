import { useMutation, useQueryClient } from "@tanstack/react-query";
import { dbUrl } from "../../api";

export const useUpdateLocationMutation = () => {
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
      queryClient.setQueryData(["locations"], (prev) =>
        prev.map((location) =>
          location.id === updatedLocation.id ? updatedLocation : location
        )
      );
    },
  });
};
