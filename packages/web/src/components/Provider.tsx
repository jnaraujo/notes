"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { Toaster } from "react-hot-toast";

interface ProviderProps {
  children: React.ReactNode;
}
export default function Provider({ children }: ProviderProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 5, // 5 minutes
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <Toaster
        toastOptions={{
          duration: 5000,
          style: {
            fontFamily: "var(--font-sans)",
          },
        }}
        position="top-center"
      />
    </QueryClientProvider>
  );
}
