"use client";

import { Lightbulb, Volume2, Square } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useSpeech } from "react-text-to-speech";
import { Button } from "@/components/ui/button";

const ShowQuestions = ({ interviewquestions, currentques }) => {
  const [question, setQuestion] = useState("");

  useEffect(() => {
    const currentQuestion = interviewquestions?.[currentques]?.question;
    setQuestion(currentQuestion || "Loading your Question");
  }, [interviewquestions, currentques]);

  const { speechStatus, isInQueue, start, pause, stop } = useSpeech({
    text: question,
    voiceURI: "Microsoft Ravi - English (India)",
    rate: 1,
  });

  return (
    <div className="w-full max-w-screen-lg mx-auto p-2 sm:p-4 md:p-6 flex flex-col space-y-5">
      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-interview-text-primary mb-1">
          Interview Questions
        </h1>
        <p className="text-xs sm:text-sm md:text-base text-interview-text-secondary">
          Navigate through questions and use AI voice assistance
        </p>
      </div>

      {/* Question Navigation */}
      <div>
        <h3 className="text-[10px] sm:text-xs font-semibold text-interview-text-secondary uppercase tracking-wide mb-2">
          Question Progress
        </h3>
        <div className="flex flex-wrap gap-2 sm:gap-3">
          {interviewquestions?.map((_, index) => (
            <div
              key={index}
              className={`px-3 py-1 sm:px-4 sm:py-2 rounded-xl border text-xs sm:text-sm font-medium transition-all duration-300 cursor-pointer transform hover:scale-105 ${
                currentques === index
                  ? "bg-gradient-primary text-white border-interview-accent shadow-glow"
                  : "bg-interview-surface text-interview-text-secondary border-interview-border hover:bg-interview-surface-hover hover:border-interview-accent"
              }`}
            >
              Q{index + 1}
            </div>
          ))}
        </div>
      </div>

      {/* Main Question Card */}
      <div className="bg-gradient-surface rounded-2xl border border-interview-border shadow-card p-3 sm:p-5 space-y-5 flex-1">
        {/* Top Info */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          {/* Left Info */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-primary rounded-xl flex items-center justify-center text-white font-bold text-sm sm:text-base">
              Q
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-interview-text-primary">
                Question {currentques + 1}
              </h2>
              <p className="text-xs sm:text-sm text-interview-text-muted">
                {interviewquestions?.length} total questions
              </p>
            </div>
          </div>

          {/* Speech Status */}
          <div className="flex justify-start sm:justify-end">
            <div
              className={`inline-flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-medium ${
                isInQueue
                  ? "bg-status-active/20 text-status-active border border-status-active/30"
                  : "bg-interview-surface text-interview-text-muted border border-interview-border"
              }`}
            >
              <div
                className={`w-2 h-2 rounded-full shrink-0 ${
                  isInQueue
                    ? "bg-status-active animate-pulse"
                    : "bg-interview-text-muted"
                }`}
              />
              <span className="truncate">{isInQueue ? "Speaking" : "Ready"}</span>
            </div>
          </div>
        </div>

        {/* Question Content */}
        <div className="bg-interview-bg rounded-xl p-3 sm:p-5 border border-interview-border break-words">
          {question !== "Loading your Question" ? (
            <p className="text-interview-text-primary text-sm sm:text-base leading-snug sm:leading-relaxed">
              <span className="font-semibold">Q.{currentques + 1}:</span>{" "}
              {question}
            </p>
          ) : (
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-5 h-5 sm:w-6 sm:h-6 border-2 border-interview-accent border-t-transparent rounded-full animate-spin" />
              <span className="text-interview-text-secondary text-sm sm:text-base">
                Loading your question...
              </span>
            </div>
          )}
        </div>

        {/* Voice Controls */}
        <div>
          <h4 className="text-xs font-medium text-interview-text-secondary uppercase tracking-wide mb-2">
            AI Voice Assistant
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
            <Button
              onClick={async () => {
                await stop();
                await start();
              }}
              disabled={question === "Loading your Question" || isInQueue}
              className="w-full bg-accent cursor-pointer hover:bg-green-800 rounded-lg px-3 py-2 sm:px-4 sm:py-3 text-sm font-medium transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
            >
              <div className="flex items-center justify-center gap-2">
                {isInQueue ? (
                  <>
                    <Square className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="truncate">Speaking...</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="truncate">Let AI ask question</span>
                  </>
                )}
              </div>
            </Button>

            {isInQueue && (
              <Button
                variant="interview-danger"
                onClick={stop}
                className="w-full bg-destructive cursor-pointer hover:bg-red-700 rounded-lg px-3 py-2 sm:px-4 sm:py-3 text-sm font-medium transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
              >
                <div className="flex items-center justify-center gap-2">
                  <Square className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="truncate">Stop</span>
                </div>
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-interview-accent/10 border border-interview-accent/20 rounded-xl p-3 sm:p-5">
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-interview-accent/20 rounded-lg flex items-center justify-center">
            <Lightbulb className="w-4 h-4 text-interview-accent" />
          </div>
          <div className="flex-1">
            <h5 className="font-semibold text-interview-text-primary text-sm sm:text-base mb-2">
              Instructions
            </h5>
            <ul className="text-interview-text-secondary text-xs sm:text-sm space-y-1 sm:space-y-2">
              <li className="flex items-start gap-1">
                <div className="w-1 h-1 bg-interview-accent rounded-full mt-1" />
                <span>
                  Click{" "}
                  <strong className="text-interview-accent">"Record"</strong> to start answering
                </span>
              </li>
              <li className="flex items-start gap-1">
                <div className="w-1 h-1 bg-interview-accent rounded-full mt-1" />
                <span>Use AI voice assistant to hear questions</span>
              </li>
              <li className="flex items-start gap-1">
                <div className="w-1 h-1 bg-interview-accent rounded-full mt-1" />
                <span>You'll receive feedback after completion</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowQuestions;
