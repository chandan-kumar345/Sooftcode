import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AuthProvider } from "@/context/AuthContext";
import MouseGlow from "@/components/MouseGlow";
import InteractiveParticleBackground from "@/components/InteractiveParticleBackground";
import IntroSplashScreen from "@/components/IntroSplashScreen";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Sooftcode | Enterprise Software Solutions & Consulting",
  description: "Transforming Ideas Into Powerful Software Solutions. Custom software development, Cloud engineering, SaaS development, Web & Mobile, AI solutions, and QA automation by Sooftcode.",
  keywords: ["Software Development", "Consulting", "Next.js", "Express", "Kubernetes", "AI Solutions", "SaaS Development"],
  authors: [{ name: "Sooftcode Team" }],
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-background text-foreground flex flex-col font-sans transition-colors duration-300">
        <AuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <IntroSplashScreen />
            <MouseGlow />
            <InteractiveParticleBackground />
            {children}
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
