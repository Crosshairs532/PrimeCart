import { authService } from "@/services/AuthServices/auth.service";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useRegistration = () => {
  return useMutation({
    mutationKey: ["registration"],
    mutationFn: authService.Registration,
    onSuccess: (data, variables, context) => {
      // successful
      console.log({ variables }, { data });
      toast.success("Registration Successful", {
        position: "bottom-right",
      });
    },
    onError: (error: any) => {
      console.log(error);
      const message = error?.response?.data?.message as
        | string
        | "Something went wrong !";
      toast.error(message);
    },
  });
};
