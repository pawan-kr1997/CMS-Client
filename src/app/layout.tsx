import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { ThemeProvider, CssBaseline } from "@mui/material";
import type { Metadata } from "next";

import theme from "@/utils/theme";
import QueryProvider from "@/contexts/queryProviders";
import { ToastContainer } from "react-toastify";

export const metadata: Metadata = {
  title: "Health Worker",
  description: "Manage and submit healthcare forms efficiently.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <QueryProvider>
              <main>{children}</main>
              <ToastContainer />
            </QueryProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
