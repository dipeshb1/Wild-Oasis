import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateSetting as updateSettingAPI } from "../../services/apiSettings";

export default function useUpdateSetting() {
  const queryClient = useQueryClient();
  const { mutate: updateSetting, isPending: isUpdating } = useMutation({
    mutationFn: (newSettingsData) => {
      updateSettingAPI(newSettingsData);
    },
    onSuccess: () => {
      toast.success("Settings has been successfully updated");
      queryClient.invalidateQueries({
        queryKey: ["settings"],
      });
    },
    onError: () => {
      toast.error("Settings could not be updated");
    },
  });

  return { updateSetting, isUpdating };
}
