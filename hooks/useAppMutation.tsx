import api from "@/lib/client";
import {
  useMutation,
  useQueryClient,
  type UseMutationOptions,
} from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

type HttpMethod = "post" | "put" | "delete";
interface UseAppMutationOptions<TData, TError, TVariables>
  extends UseMutationOptions<TData, AxiosError<TError>, TVariables> {
  url: string;
  method?: HttpMethod;
  invalidateKeys?: string[];
}

export function useAppMutation<TData, TError = Error, TVariables = unknown>(
  options: UseAppMutationOptions<TData, TError, TVariables>
) {
  const queryClient = useQueryClient();
  const { url, method = "post", invalidateKeys, ...restOptions } = options;
  return useMutation<TData, AxiosError<TError>, TVariables>({
    mutationFn: (variables: TVariables) => {
      return api[method]<TData>(url, variables).then((res) => res.data);
    },
    onSuccess: async (data) => {
      toast.success("Login successfully");
      if (invalidateKeys?.length) {
        await Promise.all(
          invalidateKeys.map((key) =>
            queryClient.invalidateQueries({ queryKey: [key] })
          )
        );
      }
    },
    onError: (error) => {
      console.log("error", error);
      const err = error as AxiosError<{ error?: string }>;
      toast.error(err?.response?.data?.error || "Something went wrong");
    },
    ...restOptions,
  });
}
