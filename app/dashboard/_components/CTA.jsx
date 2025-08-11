import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

const CTA = () => {
  return (
    <section className="py-24 text-white bg-gradient-hero relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/20 rounded-2xl mb-8 backdrop-blur-sm border border-primary/20">
            <Sparkles className="w-8 h-8 text-primary" />
          </div>

          {/* Heading */}
          <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Ready to Ace Your Next Interview?
          </h2>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Join thousands of successful job seekers who've mastered their interviews with MockMate. 
            Start practicing today and land your dream job tomorrow.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-foreground mb-1">1000+</div>
              <div className="text-muted-foreground">Success Stories</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-foreground mb-1">90%</div>
              <div className="text-muted-foreground">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-foreground mb-1">24/7</div>
              <div className="text-muted-foreground">Available</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Link href="/dashboard">
            <Button 
              variant="hero" 
              size="lg" 
              className="min-w-[200px] bg-accent cursor-pointer"
            >
              Start Free Practice
              <ArrowRight className="w-5 h-5" />
            </Button>
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-muted-foreground">
            <span>✓ No credit card required</span>
            <span>✓ Use anytime</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;