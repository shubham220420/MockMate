// app/sign-in/[[...sign-in]]/page.tsx
"use client";

import { SignIn } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function Page() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="p-4 sm:p-6">
        <Link href="/">
          <Button 
            variant="ghost" 
            className="gap-2 text-sm sm:text-base"
            size="sm"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Button>
        </Link>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6">
        <div className="w-full max-w-md">
          {/* Branding */}
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-primary to-green-400 bg-clip-text text-transparent mb-2">
              MockMate
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground px-2">
              Your AI-powered interview practice companion
            </p>
          </div>

          {/* Clerk Sign In Widget */}
          <div className="border border-border shadow-lg rounded-lg p-4 sm:p-6 bg-card">
            <SignIn
              appearance={{
                elements: {
                  rootBox: "w-full",
                  card: "shadow-none border-0 bg-transparent",
                  headerTitle: "text-lg sm:text-xl font-semibold text-foreground",
                  headerSubtitle: "text-sm text-muted-foreground",
                  socialButtonsBlockButton:
                    "border border-border hover:bg-muted text-sm",
                  formButtonPrimary:
                    "bg-primary hover:bg-primary/90 text-white w-full text-sm sm:text-base",
                  formFieldInput:
                    "border border-border rounded-md focus:ring-2 focus:ring-primary text-sm",
                  formFieldLabel: "text-sm",
                  footerActionLink: "text-sm",
                },
              }}
            />
          </div>
          
          {/* Additional Info */}
          <div className="mt-6 sm:mt-8 text-center">
            <p className="text-xs sm:text-sm text-muted-foreground">
              New to MockMate?{" "}
              <Link
                href="/HowItWorks"
                className="text-primary hover:text-primary/80 font-medium"
              >
                Learn how it works
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="p-4 sm:p-6 text-center">
        <p className="text-xs sm:text-sm text-muted-foreground">
          © 2025 MockMate. Powered by AI for better interview preparation
        </p>
      </footer>
    </div>
  );
}
