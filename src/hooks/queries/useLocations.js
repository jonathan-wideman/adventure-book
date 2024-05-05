import { useQuery } from "@tanstack/react-query";
import { dbUrl } from "../../api";

export const useLocations = () => {
  return useQuery({
    queryKey: ["locations"],
    queryFn: () => fetch(`${dbUrl}/locations`).then((res) => res.json()),
  });
};
