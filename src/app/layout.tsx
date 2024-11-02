import Header from "@/components/layout/Header";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProviders } from "@/theme/ThemeProvider";
import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "DeFi Yield Tracker",
  description:
    "Track the yield of DeFi and farming opportunities without connecting your wallet",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="h-full">
      <body className="min-h-screen flex flex-col">
        <ThemeProviders
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main className="flex-1 w-full max-w-7xl mx-auto">{children}</main>
          <Toaster />
        </ThemeProviders>
      </body>
    </html>
  );
}
