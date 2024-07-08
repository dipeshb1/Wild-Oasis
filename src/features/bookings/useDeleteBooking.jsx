import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteBooking as deleteBookingAPI } from "../../services/apiBookings";

export default function useDeleteBooking() {
  const queryClient = useQueryClient();
  const { mutate: deleteBooking, isPending: isDeleting } = useMutation({
    mutationFn: (id) => deleteBookingAPI(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        active: true,
      });
      toast.success("Booking deleted successfully");
    },
    onError: (err) => toast.error(err.message),
  });
  return { deleteBooking, isDeleting };
}
