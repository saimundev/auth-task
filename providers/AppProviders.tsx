"use client";

import { Toaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
    },
  },
});

export const AppProviders = ({ children }: { children: ReactNode }) => {
 
  return (
    <QueryClientProvider client={queryClient}>
       {children}
       <Toaster />
    </QueryClientProvider>
  );
};
