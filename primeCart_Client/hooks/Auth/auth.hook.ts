import { authService } from "@/services/AuthServices/auth.service";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useRegistration = () => {
  return useMutation({
    mutationKey: ["registration"],
    mutationFn: authService.Registration,
    onSuccess: (data, variables, context) => {
      // successful
      toast.success("Registration Successful", {
        position: "bottom-right",
      });
    },
    onError: (error) => {
      toast.error("Something wen wrong !");
    },
  });
};
