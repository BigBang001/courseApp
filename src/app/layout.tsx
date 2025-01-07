import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import AuthProvider from "@/providers/AuthProvider";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/Navbar";
import { useEffect } from "react";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "CoursePros - Find Opportunities",
  description: "Find opportunities to learn and grow",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Dynamically add the chatbot script
    const script = document.createElement('script');
    script.src = "https://app.thinkstack.ai/bot/thinkstackai-loader.min.js";
    script.async = true;
    script.setAttribute("chatbot_id", "677d85d8c5ca86136c720777"); // Replace with your actual chatbot ID
    document.body.appendChild(script);

    // Cleanup on component unmount
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>CoursePros - Find Opportunities</title>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AuthProvider>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
            <Navbar />
            {children} {/* Directly render children here */}
            <Toaster />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
