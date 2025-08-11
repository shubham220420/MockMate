import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Sparkles, MessageSquare, Target, TrendingUp, CheckCircle, Play } from "lucide-react";
import Link from "next/link";
import Navbar from "../dashboard/_components/Navbar";
const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      title: "Create Your Profile",
      description: "Tell us about your target role, experience level, and specific skills you want to focus on. Our AI will customize the interview experience just for you.",
      icon: <Target className="w-8 h-8" />,
      color: "text-blue-400"
    },
    {
      number: "02", 
      title: "AI Generates Questions",
      description: "Our advanced AI analyzes your profile and creates realistic, role-specific interview questions tailored to your experience level and industry.",
      icon: <Sparkles className="w-8 h-8" />,
      color: "text-primary"
    },
    {
      number: "03",
      title: "Practice & Interact",
      description: "Engage in natural conversations with our AI interviewer. Answer questions, ask for clarification, and experience realistic interview scenarios.",
      icon: <MessageSquare className="w-8 h-8" />,
      color: "text-purple-400"
    },
    {
      number: "04",
      title: "Get Instant Feedback",
      description: "Receive detailed feedback on your answers, communication skills, and areas for improvement. Track your progress over time.",
      icon: <TrendingUp className="w-8 h-8" />,
      color: "text-orange-400"
    }
  ];

  const features = [
    "Personalized interview experiences",
    "Real-time AI feedback",
    "Role-specific question banks",
    "Progress tracking & analytics",
    "24/7 availability",
    "Behavioral & technical questions"
  ];

  return (
   
    <div className="min-h-screen">
       <Navbar/>
 
    
      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden bg-mockmate-bg">
        <div className="absolute inset-0 gradient-bg"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              How <span className="inline-block bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent ">MockMate</span> Works
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Master your interview skills with AI-powered practice sessions that adapt to your role, 
              experience level, and career goals. Get ready to ace your next interview.
            </p>
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-20 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Simple 4-Step Process
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From setup to success, here's how MockMate transforms your interview preparation
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <Card className="h-full step-gradient border-border/50 hover:border-primary/50 transition-all duration-300">
                  <CardHeader className="text-center">
                    <div className={`mx-auto w-16 h-16 rounded-2xl bg-card/50 flex items-center justify-center mb-4 ${step.color}`}>
                      {step.icon}
                    </div>
                    <div className="text-sm font-mono text-muted-foreground mb-2">
                      STEP {step.number}
                    </div>
                    <CardTitle className="text-xl">{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center leading-relaxed">
                      {step.description}
                    </CardDescription>
                  </CardContent>
                </Card>
                
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                    <ArrowRight className="w-6 h-6 text-primary" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-mockmate-bg">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Why Choose MockMate?
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Our AI-powered platform provides personalized interview experiences that help you build confidence and improve your performance.
              </p>
              
              <div className="grid gap-4 mb-8">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-foreground">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/dashboard">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  Start Free Practice
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                </Link>
                <Button variant="outline" size="lg">
                  <Play className="w-4 h-4 mr-2" />
                  Watch Demo
                </Button>
              </div>
            </div>

            <div className="relative">
              <Card className="step-gradient border-border/50 p-8">
                <CardHeader className="text-center pb-6">
                  <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-2xl">AI Interview Experience</CardTitle>
                  <CardDescription>
                    Experience realistic mock interviews powered by advanced AI
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="p-4 bg-card/50 rounded-lg border border-border/50">
                    <div className="text-sm text-muted-foreground mb-2">AI Interviewer</div>
                    <div className="text-foreground">
                      "Tell me about a challenging project you worked on and how you overcame obstacles."
                    </div>
                  </div>
                  <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                    <div className="text-sm text-primary mb-2">Your Response</div>
                    <div className="text-foreground/80">
                      "In my previous role as a software engineer, I led the development of..."
                    </div>
                  </div>
                  <div className="p-4 bg-card/50 rounded-lg border border-border/50">
                    <div className="text-sm text-muted-foreground mb-2">AI Feedback</div>
                    <div className="text-foreground">
                      "Great use of the STAR method! Consider adding more specific metrics to strengthen your impact statement."
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <Card className="step-gradient border-border/50 text-center p-12 max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Ace Your Next Interview?
              </CardTitle>
              <CardDescription className="text-lg leading-relaxed">
                Join thousands of job seekers who have improved their interview skills with MockMate. 
                Start practicing today and land your dream job.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/dashboard">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  Start Free Practice
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                </Link>
               
              </div>
              <p className="text-sm text-muted-foreground mt-6">
                No credit card required • Get started in 30 seconds • Free forever plan
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default HowItWorks;
