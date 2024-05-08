import { useMutation, useQueryClient } from "@tanstack/react-query";
import { dbUrl } from "../../api";

export const useDeleteLocation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ locationId }) => {
      return fetch(`${dbUrl}/locations/${locationId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((response) => response.json());
    },
    onSuccess: (deletedLocation, variables) => {
      queryClient.setQueryData(["locations"], (prev) =>
        prev.filter((location) => location.id !== deletedLocation.id)
      );
    },
  });
};
