"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ChevronRight,
  Star,
  Brain,
  Target,
  User,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Award,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Report = () => {
  const params = useParams();
  const router = useRouter();
  const id = params?.interviewid;

  const [feedback, setFeedback] = useState([]);
  const [openIndexes, setOpenIndexes] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const checkInterviewExists = async () => {
    try {
      const response = await fetch("/api/get-interview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const data = await response.json();

      if (data.success && data.interview) {
        return true;
      } else {
        setError("Interview not found");
        router.push("/dashboard");
        return false;
      }
    } catch (error) {
      console.error("Error checking interview:", error);
      setError("Failed to load interview");
      router.push("/dashboard");
      return false;
    }
  };

  useEffect(() => {
    const initializeReport = async () => {
      setLoading(true);
      const exists = await checkInterviewExists();

      if (exists) {
        try {
          const res = await fetch(`/api/save-response?id=${id}`);
          const data = await res.json();

          if (Array.isArray(data)) {
            setFeedback(data);
          } else if (data && typeof data === "object") {
            const feedbackArray =
              data.feedback || data.interview?.feedback || [];
            setFeedback(feedbackArray);
          } else {
            setFeedback([]);
          }
        } catch (error) {
          console.error("Error fetching feedback:", error);
          setError("Failed to load feedback");
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    if (id) {
      initializeReport();
    }
  }, [id]);

  const toggleCollapse = (index) => {
    setOpenIndexes((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const averageRating = feedback?.length
    ? (
        feedback.reduce((sum, item) => {
          const rating = item?.AIresponse?.rating;

          if (typeof rating === "number") {
            return sum + rating;
          }
          return sum + 0;
        }, 0) / feedback.length
      ).toFixed(1)
    : null;

  const getRatingColor = (rating) => {
    let numRating;

    numRating = rating;

    if (numRating >= 8) return "success";
    if (numRating >= 6) return "warning";
    return "error";
  };

  const getRatingIcon = (rating) => {
    let numRating;

    numRating = rating;

    if (numRating >= 8) return "🎉";
    if (numRating >= 6) return "👍";
    return "📈";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-mockmate-bg">
        <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-foreground font-medium">
              Loading your interview report...
            </p>
            <p className="text-muted-foreground text-sm font-normal">
              Analyzing your performance
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-mockmate-bg ">
        <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
          <Card className="max-w-md w-full mx-4">
            <CardContent className="pt-6 text-center">
              <div className="w-16 h-16 bg-error/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="w-8 h-8 text-error" />
              </div>
              <h2 className="text-xl font-medium text-foreground mb-2">
                Report Not Found
              </h2>
              <p className="text-muted-foreground mb-6 font-normal">
                This interview report may have been deleted or doesn't exist.
              </p>
              <Button
                onClick={() => router.push("/dashboard")}
                className="w-full"
              >
                Return to Dashboard
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-mockmate-bg from-background via-muted/10 to-background relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute top-0 right-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8 sm:space-y-12">
        {/* Enhanced Header Section */}
        <div className="space-y-8 sm:space-y-12 animate-fade-in">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 sm:gap-12">
            <div className="space-y-4 sm:space-y-6">
              <div className="space-y-3">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground leading-tight tracking-normal">
                  Performance Report
                </h1>
                <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent rounded-full"></div>
              </div>
              <p className="text-base sm:text-lg text-muted-foreground max-w-2xl leading-relaxed font-normal">
                Comprehensive analysis of your interview performance with
                AI-powered insights and actionable recommendations
              </p>
            </div>

            {averageRating && (
              <Card className="w-full sm:w-auto lg:min-w-[320px] shadow-2xl border-0 bg-gradient-to-br from-card/80 via-card to-card/90 backdrop-blur-sm group hover:shadow-3xl transition-all duration-500">
                <CardContent className="p-6 md:p-8">
                  <div className="text-center space-y-4">
                    <div className="relative w-20 h-20 mx-auto">
                      <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-full p-1">
                        <div className="w-full h-full bg-card rounded-full flex items-center justify-center">
                          <div className="text-3xl group-hover:scale-110 transition-transform duration-300">
                            {getRatingIcon(averageRating)}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground font-medium uppercase tracking-wide mb-2">
                        Overall Performance
                      </div>
                      <div className="text-3xl sm:text-4xl font-semibold text-primary">
                        {averageRating}
                        <span className="text-xl text-muted-foreground font-medium">
                          /10
                        </span>
                      </div>
                    </div>
                    {/* Progress Ring */}
                    <div className="relative w-16 h-2 bg-muted rounded-full mx-auto overflow-hidden">
                      <div
                        className="absolute left-0 top-0 h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-1000 ease-out"
                        style={{
                          width: `${(parseFloat(averageRating) / 10) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Enhanced Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="group hover:shadow-2xl transition-all duration-500 border-0 bg-background from-primary/5 via-card to-primary/10 hover:scale-105 overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardContent className="p-6 relative z-10">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <div className="text-2xl sm:text-3xl font-semibold text-foreground">
                      {feedback.length}
                    </div>
                    <div className="text-sm text-muted-foreground font-medium">
                      Questions
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                    <Award className="w-6 h-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-500 border-0 bg-gradient-to-br from-success/5 via-card to-success/10 hover:scale-105 overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-r from-success/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardContent className="p-6 relative z-10">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <div className="text-2xl sm:text-3xl font-semibold text-foreground">
                      {
                        feedback.filter((item) => {
                          const rating = parseInt(
                            item.AIresponse?.rating || "0"
                          );
                          return rating >= 7;
                        }).length
                      }
                    </div>
                    <div className="text-sm text-muted-foreground font-medium">
                      Strong Answers
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-success/20 rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                    <TrendingUp className="w-6 h-6 text-success" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-500 border-0 bg-gradient-to-br from-warning/5 via-card to-warning/10 hover:scale-105 overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-r from-warning/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardContent className="p-6 relative z-10">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <div className="text-2xl sm:text-3xl font-semibold text-foreground">
                      {
                        feedback.filter((item) => {
                          const rating = parseInt(
                            item.AIresponse?.rating || "0"
                          );
                          return rating >= 6 && rating < 7;
                        }).length
                      }
                    </div>
                    <div className="text-sm text-muted-foreground font-medium">
                      Average Answers
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-warning/20 rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                    <Target className="w-6 h-6 text-warning" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Questions Section */}
        <div className="space-y-8 sm:space-y-10 animate-fade-in">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-2 h-12 bg-gradient-to-b from-primary via-accent to-primary/50 rounded-full"></div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-semibold text-foreground">
                Question Analysis
              </h2>
              <p className="text-muted-foreground mt-1 text-sm font-normal">
                Detailed breakdown of each response
              </p>
            </div>
          </div>

          <div className="space-y-8">
            {feedback.map((item, index) => {
              const rating = parseInt(item.AIresponse?.rating || "0");
              const ratingPercentage = (rating / 10) * 100;

              return (
                <Card
                  key={index}
                  className="group overflow-hidden shadow-xl hover:shadow-3xl transition-all duration-700 border-0 bg-background from-card/90 via-card to-card/80 backdrop-blur-sm hover:scale-[1.01] relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  {/* Question Header */}
                  <button
                    onClick={() => toggleCollapse(index)}
                    className="w-full text-left focus:outline-none rounded-t-lg relative z-10"
                  >
                    <CardHeader className="p-4 md:p-6 hover:bg-muted/5 transition-all duration-500">
                      <div className="flex flex-col sm:flex-row items-start justify-between gap-6">
                        <div className="flex items-start gap-4 sm:gap-6 flex-1 min-w-0">
                          {/* Question Number with Progress Ring */}
                          <div className="flex-shrink-0 relative">
                            <div className="w-12 h-12 sm:w-16 sm:h-16 relative">
                              {/* Progress Ring */}
                              <svg
                                className="w-full h-full transform -rotate-90"
                                viewBox="0 0 64 64"
                              >
                                <circle
                                  cx="32"
                                  cy="32"
                                  r="28"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="3"
                                  className="text-muted opacity-20"
                                />
                                <circle
                                  cx="32"
                                  cy="32"
                                  r="28"
                                  fill="none"
                                  stroke="url(#gradient)"
                                  strokeWidth="3"
                                  strokeDasharray={`${2 * Math.PI * 28}`}
                                  strokeDashoffset={`${
                                    2 *
                                    Math.PI *
                                    28 *
                                    (1 - ratingPercentage / 100)
                                  }`}
                                  className="transition-all duration-1000 ease-out"
                                  strokeLinecap="round"
                                />
                                <defs>
                                  <linearGradient
                                    id="gradient"
                                    x1="0%"
                                    y1="0%"
                                    x2="100%"
                                    y2="100%"
                                  >
                                    <stop
                                      offset="0%"
                                      className="text-primary"
                                      stopColor="currentColor"
                                    />
                                    <stop
                                      offset="100%"
                                      className="text-accent"
                                      stopColor="currentColor"
                                    />
                                  </linearGradient>
                                </defs>
                              </svg>
                              {/* Number */}
                              <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-lg sm:text-xl font-bold text-foreground group-hover:scale-110 transition-transform duration-300">
                                  {index + 1}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="flex-1 min-w-0 space-y-3">
                            <CardTitle className="text-base sm:text-lg font-medium text-foreground leading-relaxed pr-4 group-hover:font-medium transition-colors duration-300">
                              {item.question}
                            </CardTitle>

                            {item.AIresponse && (
                              <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
                                <div className="flex items-center gap-3">
                                  <div className="flex items-center gap-2 px-3 py-1.5 bg-primary/10 rounded-lg">
                                    <Star className="w-4 h-4 text-primary" />
                                    <span className="text-sm font-semibold text-primary">
                                      {item.AIresponse.rating}/10
                                    </span>
                                  </div>
                                </div>

                                <Badge
                                  variant={
                                    getRatingColor(item.AIresponse.rating) ===
                                    "success"
                                      ? "default"
                                      : getRatingColor(
                                          item.AIresponse.rating
                                        ) === "warning"
                                      ? "secondary"
                                      : "destructive"
                                  }
                                  className="text-xs px-2 py-1 font-medium shadow-sm"
                                >
                                  {(() => {
                                    if (rating >= 8) return "🎯 Outstanding";
                                    if (rating >= 6) return "👍 Solid";
                                    return "📈 Needs Work";
                                  })()}
                                </Badge>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="hidden sm:flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-muted/30 to-muted/10 group-hover:from-primary/20 group-hover:to-accent/20 transition-all duration-300 flex-shrink-0">
                          <ChevronRight
                            className={`w-6 h-6 text-muted-foreground group-hover:text-primary transition-all duration-500 ${
                              openIndexes[index] ? "rotate-90" : ""
                            }`}
                          />
                        </div>
                      </div>
                    </CardHeader>
                  </button>

                  {/* Collapsible Content */}
                  {openIndexes[index] && (
                    <CardContent className="border-t border-border/50 backdrop-blur-sm animate-fade-in">
                      <div className="p-4 md:p-8 space-y-6">
                        {/* Enhanced AI Feedback Section */}
                        {item.AIresponse && (
                          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Rating Card with Progress */}
                            <Card className="bg-gradient-to-br from-primary/15 via-primary/8 to-primary/5 border-primary/20 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden group/card">
                              <CardContent className="p-6 relative z-10">
                                <div className="text-center space-y-3">
                                  <div className="w-14 h-14 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto group-hover/card:scale-110 transition-transform duration-300">
                                    <Star className="w-7 h-7 text-primary" />
                                  </div>
                                  <div>
                                    <div className="font-medium text-foreground text-xs uppercase tracking-wide mb-2">
                                      Performance Score
                                    </div>
                                    <div className="text-2xl font-semibold text-primary mb-2">
                                      {item.AIresponse.rating}/10
                                    </div>
                                    <div className="w-full h-2.5 bg-primary/20 rounded-full overflow-hidden">
                                      <div
                                        className="h-full bg-gradient-to-r from-primary to-primary/80 rounded-full transition-all duration-1000 ease-out"
                                        style={{
                                          width: `${ratingPercentage}%`,
                                        }}
                                      ></div>
                                    </div>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>

                            {/* Enhanced Feedback Card */}
                            <Card className="bg-mockmate-bg from-primary/5 via-card to-primary/10 border-accent/20 lg:col-span-2 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden group/card">
                              <CardContent className="p-6 relative z-10">
                                <div className="flex flex-col">
                                  {/* Top row: Icon + Heading */}
                                  <div className="flex items-center gap-3 mb-2">
                                    <div className="w-10 h-10 bg-accent/20 rounded-xl flex items-center justify-center flex-shrink-0 group-hover/card:scale-110 transition-transform duration-300">
                                      <Brain className="w-6 h-6 text-accent" />
                                    </div>
                                    <div className="font-medium text-foreground text-xs sm:text-sm uppercase tracking-wide">
                                      AI Analysis
                                    </div>
                                  </div>

                                  {/* Feedback text */}
                                  <p className="text-foreground text-sm sm:text-base leading-snug break-words">
                                    {item.AIresponse.feedback}
                                  </p>
                                </div>
                              </CardContent>
                            </Card>
                          </div>
                        )}

                        {/* Enhanced Areas for Improvement */}
                        {item.AIresponse?.areas_for_improvement && (
                          <Card className="bg-gradient-to-br from-warning/15 via-warning/8 to-warning/5 border-warning/20 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden group/card">
                            <CardContent className="p-6 relative z-10">
                              <div className="flex flex-col">
                                {/* Top row: Icon + Heading */}
                                <div className="flex items-center gap-3 mb-2">
                                  <div className="w-10 h-10 bg-warning/20 rounded-xl flex items-center justify-center flex-shrink-0">
                                    <Target className="w-6 h-6 text-warning" />
                                  </div>
                                  <div className="font-medium text-foreground text-xs sm:text-sm uppercase tracking-wide">
                                    Growth Opportunities
                                  </div>
                                </div>

                                {/* Answer text below */}
                                <p className="text-foreground text-sm sm:text-base leading-snug break-words">
                                  {item.AIresponse.areas_for_improvement}
                                </p>
                              </div>
                            </CardContent>
                          </Card>
                        )}

                        {/* Enhanced Answer Comparison */}
                        <div className="space-y-6">
                          <h4 className="text-xl font-medium text-foreground flex items-center gap-3">
                            <div className="w-1.5 h-7 bg-gradient-to-b from-accent to-accent/50 rounded-full"></div>
                            Response Analysis
                          </h4>

                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Expected Answer */}
                            <Card className="bg-gradient-to-br from-success/15 via-success/8 to-success/5 border-success/20 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden group/card">
                              <CardContent className="p-6 relative z-10">
                                <div className="flex flex-col">
                                  {/* Top row: Icon + Heading */}
                                  <div className="flex items-center gap-3 mb-2">
                                    <div className="w-10 h-10 bg-success/20 rounded-xl flex items-center justify-center flex-shrink-0 group-hover/card:scale-110 transition-transform duration-300">
                                      <CheckCircle className="w-6 h-6 text-success" />
                                    </div>
                                    <div className="font-medium text-foreground text-xs sm:text-sm uppercase tracking-wide">
                                      Ideal Response
                                    </div>
                                  </div>

                                  {/* Answer text below */}
                                  <p className="text-foreground text-sm sm:text-base leading-snug break-words">
                                    {item.answer}
                                  </p>
                                </div>
                              </CardContent>
                            </Card>

                            {/* Your Answer */}
                            <Card
                              className={`shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden group/card ${
                                getRatingColor(item.AIresponse?.rating) ===
                                "success"
                                  ? "bg-gradient-to-br from-success/15 via-success/8 to-success/5 border-success/20"
                                  : getRatingColor(item.AIresponse?.rating) ===
                                    "warning"
                                  ? "bg-gradient-to-br from-warning/15 via-warning/8 to-warning/5 border-warning/20"
                                  : "bg-gradient-to-br from-error/15 via-error/8 to-error/5 border-error/20"
                              }`}
                            >
                              <CardContent className="p-6 relative z-10">
                                <div className="flex flex-col">
                                  {/* Top row: Icon + Heading */}
                                  <div className="flex items-center gap-3 mb-2">
                                    <div
                                      className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover/card:scale-110 transition-transform duration-300 ${
                                        getRatingColor(
                                          item.AIresponse?.rating
                                        ) === "success"
                                          ? "bg-success/20"
                                          : getRatingColor(
                                              item.AIresponse?.rating
                                            ) === "warning"
                                          ? "bg-warning/20"
                                          : "bg-error/20"
                                      }`}
                                    >
                                      <User
                                        className={`w-6 h-6 ${
                                          getRatingColor(
                                            item.AIresponse?.rating
                                          ) === "success"
                                            ? "text-success"
                                            : getRatingColor(
                                                item.AIresponse?.rating
                                              ) === "warning"
                                            ? "text-warning"
                                            : "text-error"
                                        }`}
                                      />
                                    </div>
                                    <div className="font-medium text-foreground text-xs sm:text-sm uppercase tracking-wide">
                                      Your Response
                                    </div>
                                  </div>

                                  {/* Text below */}
                                  <p className="text-foreground text-sm sm:text-base leading-snug break-words">
                                    {item.useranswer}
                                  </p>
                                </div>
                              </CardContent>
                            </Card>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  )}
                </Card>
              );
            })}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 pt-6">
          <Button
            onClick={() => router.push("/dashboard/history")}
            variant="outline"
            className="flex-1"
          >
            Back to your Interviews
          </Button>
          <Button onClick={() => router.push("/dashboard")} className="flex-1">
            Start New Interview
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Report;
