"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";
import { useAuthStore } from "@/lib/stores";
import { useRouter } from "next/navigation";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const { isLogged } = useAuthStore();
  const router = useRouter();

  React.useEffect(() => {
    if (!isLogged) {
      router.push("/");
    }
  }, [isLogged]);

  return (
    <NextThemesProvider {...props} defaultTheme="dark">
      {children}
    </NextThemesProvider>
  );
}
