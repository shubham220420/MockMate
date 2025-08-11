import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "MockMate",
  description:
    "MockMate helps students and job seekers prepare for interviews with AI-driven mock sessions, personalized feedback, and real-time voice or chat interaction. Get ready for your dream job with tailored practice.",
  keywords: [
    "AI interview",
    "mock interview",
    "interview preparation",
    "AI career coach",
    "job preparation",
    "technical interview",
    "behavioral interview",
    "MERN interview app",
    "Next.js AI interview",
    "student interview practice",
  ],
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en" className="dark">
        <head>
          <link rel="icon" href="./favicon.ico" type="image/x-icon" />
        </head>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased `}
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
