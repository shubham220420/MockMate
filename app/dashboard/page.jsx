"use client";
import React from "react";
import Addinterview from "./_components/Addinterview";

import { 
  Sparkles,  
  Clock, 
  Target, 
  Users
} from "lucide-react";


const Dashboard = () => {
  const stats = [
    {
      icon: <Clock className="w-6 h-6" />,
      label: "Prepare Anytime",
      value: "24/7",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: <Target className="w-6 h-6" />,
      label: "Success Rate",
      value: "90  %",
      color: "from-green-500 to-green-600"
    },
    {
      icon: <Users className="w-6 h-6" />,
      label: "Active Users",
      value: "1k+",
      color: "from-purple-500 to-purple-600"
    },

  ];

  return (
    <div className="bg-mockmate-bg from-slate-900 via-slate-800 to-slate-900">
      {/* Animated background elements */}
<div className="absolute inset-0 overflow-hidden pointer-events-none">
  <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-green-500/20 to-blue-500/20 rounded-full blur-3xl animate-pulse pointer-events-none"></div>
  
</div>

      <div className="relative z-10 overflow-hidden">
        {/* Header Section */}
        <div className="px-4 sm:px-8 py-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Welcome Back!
                </h1>
                <p className="text-gray-400 mt-2 text-lg">
                  Ready to ace your next interview?
                </p>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {stats.map((stat, index) => (
                <div 
                  key={index}
                  className="bg-slate-800/50 flex flex-col items-center justify-center backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 hover:border-slate-600/50 transition-all duration-300 hover:shadow-lg hover:shadow-slate-700/20"
                >
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${stat.color} flex items-center justify-center mb-3`}>
                    {stat.icon}
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 backdrop-blur-sm border border-green-500/20 rounded-2xl p-8 mb-8">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
                    <Sparkles className="w-6 h-6 text-green-400" />
                    Start Your Journey
                  </h2>
                  <p className="text-gray-300">
                    Create a new mock interview tailored to your role and experience level
                  </p>
                </div>
                <Addinterview/>
              </div>
            </div>

           
       <div className="grid md:grid-cols-3 gap-6 mt-16">
        <div className="absolute -bottom-40 left-0 w-80 h-80 bg-gradient-to-tr from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse pointer-events-none" style={{ animationDelay: '2s' }}></div>
            <div className="bg-gradient-card border border-primary/20 rounded-xl p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Targeted Questions</h3>
              <p className="text-muted-foreground text-sm">
                Questions tailored to your specific role and experience level
              </p>
            </div>

            <div className="bg-gradient-card border border-primary/20 rounded-xl p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🤖</span>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">AI-Powered</h3>
              <p className="text-muted-foreground text-sm">
                Advanced AI creates realistic interview scenarios
              </p>
            </div>

            <div className="bg-gradient-card border border-primary/20 rounded-xl p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Instant Feedback</h3>
              <p className="text-muted-foreground text-sm">
                Get detailed feedback and improvement suggestions
              </p>
            </div>
          </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
