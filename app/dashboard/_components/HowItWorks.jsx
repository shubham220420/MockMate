import { Upload, Settings, MessageCircle, TrendingUp } from "lucide-react";

const HowItWorks = () => {
  return (
    <section className="py-24  text-white ">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            How It <span className="text-foreground font-semibold">Works</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get interview-ready in just 4 simple steps. Our streamlined process ensures you're practicing effectively from day one.
          </p>
        </div>

        <div className="relative">
          {/* Connection line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-primary opacity-30 transform -translate-y-1/2"></div>

          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
            
            {/* Step 01 */}
            <div className="text-center group">
              <div className="relative mb-6">
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center text-white text-sm font-bold z-10">
                  01
                </div>
                <div className="w-20 h-20 mx-auto bg-gradient-card rounded-2xl flex items-center justify-center shadow-elegant group-hover:shadow-glow transition-all duration-300 group-hover:scale-110 border border-primary/10">
                  <Settings className="w-10 h-10 text-primary" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3">Customize Your Session</h3>
              <p className="text-muted-foreground leading-relaxed">
                Choose your interview type, difficulty level, and focus areas.
              </p>
            </div>

            {/* Step 02 */}
            <div className="text-center group">
              <div className="relative mb-6">
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center text-white text-sm font-bold z-10">
                  02
                </div>
                <div className="w-20 h-20 mx-auto bg-gradient-card rounded-2xl flex items-center justify-center shadow-elegant group-hover:shadow-glow transition-all duration-300 group-hover:scale-110 border border-primary/10">
                  <MessageCircle className="w-10 h-10 text-primary" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3">Start Practicing</h3>
              <p className="text-muted-foreground leading-relaxed">
                Engage in realistic conversations with our AI interviewer.
              </p>
            </div>

            {/* Step 03 */}
            <div className="text-center group">
              <div className="relative mb-6">
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center text-white text-sm font-bold z-10">
                  03
                </div>
                <div className="w-20 h-20 mx-auto bg-gradient-card rounded-2xl flex items-center justify-center shadow-elegant group-hover:shadow-glow transition-all duration-300 group-hover:scale-110 border border-primary/10">
                  <TrendingUp className="w-10 h-10 text-primary" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3">Get Feedback</h3>
              <p className="text-muted-foreground leading-relaxed">
                Receive detailed insights and actionable tips to improve.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-primary/5 rounded-full border border-primary/20">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
            <span className="text-primary font-medium">Get started in under 2 minutes</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
