import { Brain, MessageSquare, BarChart3, Zap, Shield, Globe } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Interviews",
    description: "Advanced AI that understands your industry, role, and experience level to provide tailored interview questions.",
    gradient: "from-purple-500 to-pink-500"
  },
  {
    icon: MessageSquare,
    title: "Real-time Conversations",
    description: "Natural voice conversations with intelligent follow-up questions, just like a real interview.",
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    icon: BarChart3,
    title: "Detailed Analytics",
    description: "Get comprehensive feedback on your performance, speaking pace, confidence level, and areas for improvement.",
    gradient: "from-green-500 to-emerald-500"
  },
  {
    icon: Zap,
    title: "Instant Feedback",
    description: "Receive immediate insights and personalized recommendations after each interview session.",
    gradient: "from-yellow-500 to-orange-500"
  },
  {
    icon: Shield,
    title: "Industry-Specific",
    description: "Practice with questions specifically designed for your field - tech, finance, marketing, and more.",
    gradient: "from-red-500 to-pink-500"
  },
  {
    icon: Globe,
    title: "Available 24/7",
    description: "Practice anytime, anywhere. No scheduling conflicts or waiting for human interviewers.",
    gradient: "from-indigo-500 to-purple-500"
  }
];

const Features = () => {
  return (
    <section className="py-24 text-white bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Why Choose <span className="inline-block bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent font-semibold">MockMate</span>?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our AI-powered platform combines cutting-edge technology with proven interview techniques 
            to give you the confidence and skills needed to succeed.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-elegant transition-all duration-300 hover:-translate-y-2 border-primary/10 bg-gradient-card backdrop-blur-sm"
            >
              <CardHeader>
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.gradient} p-3 mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl mb-2">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;