"use client";

import { ThemeProvider } from "next-themes";
import PayPalProvider from "@/components/PayPalProvider";

export function Providers({ children }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <PayPalProvider>{children}</PayPalProvider>
    </ThemeProvider>
  );
}
