"use client";

import AuthProvider from "@/components/AuthProvider";
import { ThemeProvider } from "@/components/ThemeProvider";

export default function ClientLayout({ children }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      storageKey="hotseat-theme"
    >
      <AuthProvider>{children}</AuthProvider>
    </ThemeProvider>
  );
} 