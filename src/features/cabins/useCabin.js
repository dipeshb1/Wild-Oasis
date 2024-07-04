import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";

export default function useCabin() {
  const { isPending, data: cabins } = useQuery({
    queryKey: ["cabin"],
    queryFn: getCabins,
  });

  return { isPending, cabins };
}
