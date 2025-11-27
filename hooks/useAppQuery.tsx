
import api from "@/lib/client";
import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";

interface SuccessResponse<TData> {
  message: string;
  data: TData;
}

interface UseAppQueryOptions<TData, TError>
  extends Omit<
    UseQueryOptions<TData, AxiosError<TError>>,
    "queryKey" | "queryFn"
  > {
  queryKey: (string | unknown)[];
  url: string;
  enabled?: boolean;
  params?: Record<string, any>;
}

export function useAppQuery<TData, TError = { message?: string }>(
  options: UseAppQueryOptions<TData, TError>
) {
  const { queryKey, url, enabled = true, params, ...restOptions } = options;

  return useQuery<TData, AxiosError<TError>>({
    queryKey: [...queryKey, params],
    queryFn: async () => {
      try {
        const res = await api.get<TData>(url, { params });
        return res.data;
      } catch (error) {
        const err = error as AxiosError<{ message?: string }>;
        // toast.error(err?.response?.data?.message || "Failed to fetch data");
        console.log("error logs =====>", err);
        throw error;
      }
    },
    enabled,
    ...restOptions,
  });
}
