import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

export default function useBookings() {
  const [seatchParams] = useSearchParams();
  const queryClient = useQueryClient();

  //For Server side filtering. In cabins, we did client side filtering.

  const filterValue = seatchParams.get("status");
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue };

  //Sort
  const [field, direction] = (
    seatchParams.get("sortBy") || "startDate-desc"
  ).split("-");
  const sortBy = { field, direction };

  //Pagination

  const page = seatchParams.get("page") ? Number(seatchParams.get("page")) : 1;

  const {
    data: { data: bookings, count } = {},
    error,
    isPending,
  } = useQuery({
    //useQuery will re-fetch the data when the filter changes. Consider it as a dependency array.
    queryKey: ["bookings", filter, sortBy, page],
    queryFn: () => getBookings({ filter, sortBy, page }),
  });

  //Pre-Fetching
  const pageCount = Math.ceil(count / PAGE_SIZE);
  if (page < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page + 1],
      queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
    });
  }
  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page + 1],
      queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
    });
  }

  return { bookings, error, isPending, count };
}
