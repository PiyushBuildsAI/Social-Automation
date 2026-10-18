import type { Metadata, Viewport } from "next";
import { Baloo_2, Quicksand } from "next/font/google";
import "./globals.css";

import { ServiceWorkerRegistrar } from "@/components/pwa/service-worker-register";

const baloo = Baloo_2({
  variable: "--font-baloo",
  subsets: ["latin"],
  display: "swap",
});

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
  display: "swap",
});

/**
 * Every app screen reads the session cookie server-side before it can render, and
 * `cacheComponents` is on, so a navigation into a screen legitimately blocks on
 * the request. Opting the whole tree out here (instead of adding `instant = false`
 * to ~30 route files) keeps the auth gate authoritative and stops the prerender
 * validation from failing the build. Public pages such as `/` and `/offline` read
 * no runtime data, so they still prerender into a static shell.
 */
export const instant = false;

export const metadata: Metadata = {
  title: "AutoMate — Automate the boring stuff",
  description:
    "Connect your apps, set your rules, and let AI do the repetitive work for you.",
  applicationName: "AutoMate",
  // Installed-app behaviour on iOS: full-screen, no Safari chrome.
  appleWebApp: {
    capable: true,
    title: "AutoMate",
    statusBarStyle: "default",
  },
  formatDetection: { telephone: false, date: false, address: false, email: false },
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // Lets the app paint under the notch when installed; the shell adds the inset.
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#2b2340" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${baloo.variable} ${quicksand.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        {children}
        <ServiceWorkerRegistrar />
      </body>
    </html>
  );
}
