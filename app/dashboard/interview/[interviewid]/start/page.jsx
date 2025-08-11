"use client";
import { Button } from "@/components/ui/button";
import React, { useState, useEffect } from "react";
import Showquestions from "../../../_components/Showquestions";
import RecordAnswer from "@/app/dashboard/_components/Recordanswer";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Send } from "lucide-react";



const Start = () => {
  const params = useParams();
  const router = useRouter();
  const id = params?.interviewid;
 
  const [currentques, setcurrentques] = useState(0);
  const [interviewquestions, setinterviewquestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchInterview = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/get-interview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const data = await response.json();
      
      if (data.success && data.interview) {
        setinterviewquestions(data.interview?.jobResponse);
        setError(null);
      } else {
        setError("Interview not found");
        alert("❌ Interview not found! This interview may have been deleted or doesn't exist.");
        router.push("/dashboard");
        return;
      }
    } catch (error) {
      console.error("Error fetching interview data:", error);
      setError("Failed to load interview");
      alert("❌ Failed to load interview data. Please try again.");
      router.push("/dashboard");
      return;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchInterview();
    }
  }, [id]);

 
  if (loading) {
    return (
      <div className="min-h-screen bg-mockmate-bg  from-slate-900 via-slate-800 to-slate-900   flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
          <h2 className="text-2xl font-bold text-white mb-2">Loading Interview</h2>
          <p className="text-slate-400">Preparing your personalized experience...</p>
        </div>
      </div>
    );
  }

  
  if (error) {
    return (
      <div className="min-h-screen bg-mockmate-bg from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center p-8 bg-slate-800/50 rounded-2xl border border-slate-700">
          <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">❌</span>
          </div>
          <h2 className="text-2xl font-bold text-white mb-3">Interview Not Found</h2>
          <p className="text-slate-400 mb-6">This interview may have been deleted or doesn't exist.</p>
          <Link href="/dashboard">
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl">
              Back to Dashboard
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-mockmate-bg from-slate-900 via-slate-800 to-slate-900">
      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto p-3 sm:p-4 md:p-6">
        {/* Two Column Layout - Responsive */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 min-h-[calc(100vh-8rem)] md:min-h-[calc(100vh-12rem)]">
          {/* Left Column - Questions */}
          <div className="bg-slate-800/30 rounded-2xl border border-slate-700/50 backdrop-blur-sm overflow-hidden min-h-[400px] md:min-h-[600px]">
            <Showquestions
              currentques={currentques}
              interviewquestions={interviewquestions}
              setCurrentques={setcurrentques}
            />
          </div>

          {/* Right Column - Recording */}
          <div className="bg-slate-800/30 rounded-2xl border border-slate-700/50 backdrop-blur-sm overflow-hidden min-h-[400px] md:min-h-[600px]">
            <RecordAnswer
              currentques={currentques}
              interviewquestions={interviewquestions}
              id={id}
            />
          </div>
        </div>

        {/* Bottom Navigation - Responsive */}
        <div className="mt-4 md:mt-6">
          <div className="bg-slate-800/40 rounded-2xl border border-slate-700/50 backdrop-blur-sm p-3 sm:p-4 md:p-6">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              {/* Previous Button */}
              <div className="w-full sm:w-auto sm:flex-1">
                {currentques > 0 && (
                  <Button
                    variant="outline"
                    size={window.innerWidth < 640 ? "sm" : "lg"}
                    className="w-full cursor-pointer sm:w-auto bg-slate-700/50 border-slate-600 text-white hover:bg-slate-600 hover:border-slate-500 transition-all duration-200"
                    onClick={() => setcurrentques(currentques - 1)}
                  >
                    <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                    <span className="hidden sm:inline">Previous</span>
                    <span className="sm:hidden">Prev</span>
                  </Button>
                )}
              </div>

              {/* Progress Indicator - Responsive */}
              <div className="w-full sm:w-auto sm:flex-1 order-first sm:order-none">
                <div className="flex items-center justify-center gap-2 sm:gap-4 px-3 sm:px-6 py-2 sm:py-3 bg-slate-700/30 rounded-xl border border-slate-600/50">
                  <div className="text-xs sm:text-sm text-slate-400 hidden sm:block">Question</div>
                  <div className="text-base sm:text-xl font-bold text-white">
                    {currentques + 1} / {interviewquestions?.length || 0}
                  </div>
                  <div className="w-16 sm:w-24 h-2 bg-slate-600 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 transition-all duration-300"
                      style={{ width: `${((currentques + 1) / (interviewquestions?.length || 1)) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Next/Submit Button */}
              <div className="w-full sm:w-auto sm:flex-1 flex justify-end">
                {currentques < (interviewquestions?.length - 1) ? (
                  <Button
                    size={window.innerWidth < 640 ? "sm" : "lg"}
                    className="w-full cursor-pointer sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white transition-all duration-200"
                    onClick={() => setcurrentques(currentques + 1)}
                  >
                    <span className="hidden sm:inline">Next</span>
                    <span className="sm:hidden">Next</span>
                    <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1 sm:ml-2" />
                  </Button>
                ) : (
                  <Link href={`/dashboard/interview/${id}/report`} passHref className="w-full sm:w-auto">
                    <Button
                      size={window.innerWidth < 640 ? "sm" : "lg"}
                      className="w-full cursor-pointer sm:w-auto bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 text-white shadow-lg transition-all duration-200"
                    >
                      <Send className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                      <span className="hidden sm:inline">Submit Answers</span>
                      <span className="sm:hidden">Submit</span>
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
 
export default Start;