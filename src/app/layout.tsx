import Header from "@/components/layout/Header";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProviders } from "@/theme/ThemeProvider";
import type { Metadata, Viewport } from "next";
import "./globals.css";

const APP_NAME = "VFAT Tracker";
const APP_DEFAULT_TITLE = "VFAT Tracker";
const APP_TITLE_TEMPLATE = "%s - VFAT Tracker";
const APP_DESCRIPTION = "Track your VFAT positions across multiple chains";

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE,
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
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
          <main className="flex-1 w-[90%] max-w-7xl mx-auto">{children}</main>
          <Toaster />
        </ThemeProviders>
      </body>
    </html>
  );
}
