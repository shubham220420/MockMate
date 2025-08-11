  "use cleint"
  import { Star, Quote } from "lucide-react";
  import { Card, CardContent } from "@/components/ui/card";


  const Testimonials = () => {
    return (
      <section className="py-24 bg-background text-white"
  >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Success <span className="text-foreground font-semibold">Stories</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Join thousands of professionals who've landed their dream jobs with MockMate. 
              Here's what they have to say about their experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <Card className="group hover:shadow-elegant transition-all duration-300 hover:-translate-y-1 border-primary/10 bg-background/50 backdrop-blur-sm relative overflow-hidden">
              <CardContent className="p-6">
                <Quote className="w-8 h-8 text-primary/20 mb-4" />
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  "MockMate helped me land my dream job at Google! The AI interviewer asked questions that were incredibly similar to my actual interview. The feedback was spot-on and helped me improve my communication skills."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center text-white font-semibold text-sm">
                    SC
                  </div>
                  <div>
                    <div className="font-semibold">Sarah Chen</div>
                    <div className="text-sm text-muted-foreground">Software Engineer at Google</div>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
              </CardContent>
            </Card>

            {/* Testimonial 2 */}
            <Card className="group hover:shadow-elegant transition-all duration-300 hover:-translate-y-1 border-primary/10 bg-background/50 backdrop-blur-sm relative overflow-hidden">
              <CardContent className="p-6">
                <Quote className="w-8 h-8 text-primary/20 mb-4" />
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  "I practiced for 2 weeks with MockMate before my Meta interview. The behavioral questions and product sense scenarios were extremely realistic. I felt so much more confident going into the real thing."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center text-white font-semibold text-sm">
                    MR
                  </div>
                  <div>
                    <div className="font-semibold">Michael Rodriguez</div>
                    <div className="text-sm text-muted-foreground">Product Manager at Meta</div>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
              </CardContent>
            </Card>

            {/* Testimonial 3 */}
            <Card className="group hover:shadow-elegant transition-all duration-300 hover:-translate-y-1 border-primary/10 bg-background/50 backdrop-blur-sm relative overflow-hidden">
              <CardContent className="p-6">
                <Quote className="w-8 h-8 text-primary/20 mb-4" />
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  "The technical interview practice was game-changing. MockMate's AI understood the nuances of data science roles and asked questions that challenged me in the right way. Highly recommend!"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center text-white font-semibold text-sm">
                    EJ
                  </div>
                  <div>
                    <div className="font-semibold">Emily Johnson</div>
                    <div className="text-sm text-muted-foreground">Data Scientist at Netflix</div>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
              </CardContent>
            </Card>

            {/* Testimonial 4 */}
            <Card className="group hover:shadow-elegant transition-all duration-300 hover:-translate-y-1 border-primary/10 bg-background/50 backdrop-blur-sm relative overflow-hidden">
              <CardContent className="p-6">
                <Quote className="w-8 h-8 text-primary/20 mb-4" />
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  "As someone transitioning careers, MockMate gave me the confidence I needed. The industry-specific questions and instant feedback helped me articulate my transferable skills effectively."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center text-white font-semibold text-sm">
                    DP
                  </div>
                  <div>
                    <div className="font-semibold">David Park</div>
                    <div className="text-sm text-muted-foreground">Marketing Director at Spotify</div>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
              </CardContent>
            </Card>

            {/* Testimonial 5 */}
            <Card className="group hover:shadow-elegant transition-all duration-300 hover:-translate-y-1 border-primary/10 bg-background/50 backdrop-blur-sm relative overflow-hidden">
              <CardContent className="p-6">
                <Quote className="w-8 h-8 text-primary/20 mb-4" />
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  "The portfolio review and design thinking questions were incredibly thorough. MockMate helped me structure my answers better and present my work more effectively. Got the job on my second try!"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center text-white font-semibold text-sm">
                    LW
                  </div>
                  <div>
                    <div className="font-semibold">Lisa Wang</div>
                    <div className="text-sm text-muted-foreground">UX Designer at Airbnb</div>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
              </CardContent>
            </Card>

            {/* Testimonial 6 */}
            <Card className="group hover:shadow-elegant transition-all duration-300 hover:-translate-y-1 border-primary/10 bg-background/50 backdrop-blur-sm relative overflow-hidden">
              <CardContent className="p-6">
                <Quote className="w-8 h-8 text-primary/20 mb-4" />
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  "MockMate's finance interview prep is unmatched. The technical questions, case studies, and market analysis scenarios prepared me perfectly for my JPMorgan interview. Worth every minute!"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center text-white font-semibold text-sm">
                    JW
                  </div>
                  <div>
                    <div className="font-semibold">James Wilson</div>
                    <div className="text-sm text-muted-foreground">Financial Analyst at JPMorgan</div>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    );
  };

  export default Testimonials;
