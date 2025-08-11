"use client"
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Users, Star, Clock, Link } from "lucide-react";




const HeroSection = () => {
  return (
       <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20  -right-35 w-80 h-80 bg-primary/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96  bg-accent/20 rounded-full blur-3xl animate-float "></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
        

          {/* Main heading */}
         <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
  Ace Your Next Interview with{" "}
 <span className="inline-block bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent">
  MockMate
</span>

</h1>


          {/* Subheading */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            AI-powered mock interviews that adapt to your role, experience, and goals. 
            Practice with realistic scenarios and get instant feedback to land your dream job.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 mb-10 text-center">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              <span className="text-foreground font-semibold">1000+ Users</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              <span className="text-foreground font-semibold">90% Success Rate</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-primary" />
              <span className="text-foreground font-semibold">4.5/5 Rating</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link href="/dashboard">
            <Button variant="outline" size="lg" className="min-w-[200px]  shadow-elegant cursor-pointer hover:shadow-glow transition-all duration-300 group-hover:scale-110 border backdrop-blur-sm ">
              Start Free Practice
              <ArrowRight className="w-5 h-5" />
            </Button>
            </Link>
            <Button variant="outline" size="lg" className="min-w-[200px]  shadow-elegant cursor-pointer hover:shadow-glow transition-all duration-300 group-hover:scale-110 border backdrop-blur-sm">
              <Play className="w-5 h-5" />
              Watch Demo
            </Button>
          </div>
            {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6 backdrop-blur-sm border border-primary/20">
            <Star className="w-4 h-4" />
            <span className="text-sm font-medium">Trusted by 1000+ job seekers</span>
          </div>

          {/* Trust indicators */}
          <p className="text-sm text-muted-foreground">
            No credit card required • Get started in 30 seconds • Free forever plan
          </p>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};
  

export default HeroSection;
