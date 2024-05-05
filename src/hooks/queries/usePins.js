import { useQuery } from "@tanstack/react-query";
import { dbUrl } from "../../api";

export const usePins = () => {
  return useQuery({
    queryKey: ["pins"],
    queryFn: () => fetch(`${dbUrl}/pins`).then((res) => res.json()),
  });
};
