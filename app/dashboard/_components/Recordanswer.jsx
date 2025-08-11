"use client";

import React, { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import { Button } from "@/components/ui/button";
import {
  Video,
  VideoOff,
  Mic,
  MicOff,
  Square,
  Upload,
  Clock,
  User,
  FileText,
} from "lucide-react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

const RecordAnswer = ({
  interviewquestions,
  currentques,
  id,
  className = "",
}) => {
  const webcamRef = useRef(null);
  const [hasCameraAccess, setHasCameraAccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const question = interviewquestions?.[currentques]?.question;

  useEffect(() => {
    if (transcript) {
      console.log("Transcript:", transcript);
    }
  }, [transcript]);

  const getAIresponse = async () => {
    setIsSubmitting(true);
    const useranswer = transcript;
    resetTranscript();

    try {
      const res = await fetch("/api/gemini/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          interviewquestion: question,
          useranswer: useranswer,
        }),
      });

      const data = await res.json();
      console.log("AI Response:", data);
      const cleaned = data.data.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(cleaned);

      await fetch("/api/save-response", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id,
          currentquestionIndex: currentques,
          AIresponse: parsed,
          useranswer: useranswer,
        }),
      });
    } catch (err) {
      console.error("Error submitting answer:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const wordCount = transcript
    ? transcript.split(" ").filter(Boolean).length
    : 0;

  if (!browserSupportsSpeechRecognition) {
    return (
      <div className="h-full bg-gradient-bg p-6 flex items-center justify-center">
        <div className="bg-gradient-surface rounded-2xl border border-status-recording/50 p-8 text-center max-w-md mx-auto">
          <div className="w-16 h-16 bg-status-recording/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <MicOff className="w-8 h-8 text-status-recording" />
          </div>
          <h3 className="text-xl font-bold text-interview-text-primary mb-2">
            Speech Recognition Not Supported
          </h3>
          <p className="text-interview-text-secondary">
            Your browser does not support speech recognition. Please use a
            modern browser like Chrome or Edge.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`w-full max-w-screen-lg mx-auto p-4 md:p-6 space-y-6 ${className}`}
    >
      <div className="space-y-2">
        <h2 className="text-2xl md:text-3xl font-bold text-interview-text-primary">
          Record Your Answer
        </h2>
        <p className="text-sm md:text-base text-interview-text-secondary">
          Speak clearly and maintain eye contact with the camera
        </p>
      </div>

      {/* Video Card */}
      <div className="bg-gradient-surface rounded-2xl border border-interview-border shadow-card p-3 sm:p-4 space-y-4">
        <div className="flex flex-wrap justify-between items-center gap-2 sm:gap-3">
          <h3 className="text-base sm:text-lg font-semibold text-interview-text-primary">
            Video Recording
          </h3>
          <div className="flex flex-wrap gap-2">
            <div
              className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium flex items-center gap-2 
        ${
          hasCameraAccess
            ? "bg-status-active/20 text-status-active border border-status-active/30"
            : "bg-status-recording/20 text-status-recording border border-status-recording/30"
        }`}
            >
              <div
                className={`w-2 h-2 rounded-full ${
                  hasCameraAccess ? "bg-status-active" : "bg-status-recording"
                }`}
              />
              {hasCameraAccess ? "Camera Active" : "Camera Off"}
            </div>

            {listening && (
              <div className="px-2 sm:px-3 py-1 rounded-full text-xs font-medium flex items-center gap-2 bg-status-recording/20 text-status-recording border border-status-recording/30">
                <div className="w-2 h-2 bg-status-recording rounded-full animate-pulse" />
                Recording
              </div>
            )}
          </div>
        </div>

        <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-interview-bg border border-interview-border">
          {hasCameraAccess ? (
            <Webcam
              ref={webcamRef}
              mirrored
              className="w-full h-full object-cover"
              onUserMedia={() => setHasCameraAccess(true)}
              onUserMediaError={() => setHasCameraAccess(false)}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-center px-3">
              <div className="max-w-[90%]">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-interview-surface rounded-full flex items-center justify-center mx-auto mb-3">
                  <VideoOff className="w-8 h-8 text-interview-text-muted" />
                </div>
                <p className="text-interview-text-secondary font-medium text-sm sm:text-base">
                  Camera Access Required
                </p>
                <p className="text-interview-text-muted text-xs sm:text-sm">
                  Enable camera to start recording
                </p>
              </div>
            </div>
          )}
        </div>

        <Button
          variant={hasCameraAccess ? "interview-danger" : "interview"}
          onClick={() => setHasCameraAccess((prev) => !prev)}
          className={`w-full text-sm sm:text-base cursor-pointer   flex items-center justify-center gap-2 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] ${
            hasCameraAccess
              ? "bg-red-600 hover:bg-red-700"
              : "bg-accent hover:bg-green-800"
          }`}
        >
          {hasCameraAccess ? (
            <>
              <VideoOff className="w-4 h-4" />
              Stop Camera
            </>
          ) : (
            <>
              <Video className="w-4 h-4" />
              Start Camera
            </>
          )}
        </Button>
      </div>

      {/* Voice Card */}
      <div className="bg-gradient-surface rounded-2xl border border-interview-border shadow-card p-4 md:p-6 space-y-4 flex-1">
        <div className="flex flex-wrap justify-between items-center gap-2">
          <h3 className="text-lg font-semibold text-interview-text-primary">
            Voice Recording
          </h3>
          <div className="flex items-center gap-4 text-sm text-interview-text-secondary">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              {wordCount} words
            </div>
            {listening && (
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Recording...
              </div>
            )}
          </div>
        </div>

        <div className="bg-interview-bg rounded-xl border border-interview-border p-4 h-32 overflow-y-auto">
          {transcript ? (
            <p className="text-interview-text-primary leading-relaxed">
              {transcript}
            </p>
          ) : (
            <p className="text-interview-text-muted italic">
              Your speech will appear here as you speak...
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Button
            onClick={() =>
              listening
                ? SpeechRecognition.stopListening()
                : SpeechRecognition.startListening({ continuous: true })
            }
            className={`w-full  transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer ${
              listening
                ? "bg-red-600 hover:bg-red-700"
                : "bg-accent hover:bg-green-800"
            }`}
          >
            {listening ? (
              <>
                <Square className="w-4 h-4" />
                Stop Recording
              </>
            ) : (
              <>
                <Mic className="w-4 h-4" />
                Start Recording
              </>
            )}
          </Button>

          <Button
            onClick={async () => {
              await SpeechRecognition.stopListening();
              await getAIresponse();
            }}
            disabled={!transcript || isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-700 cursor-pointer  transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <Upload className="w-4 h-4" />
                Submit Answer
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Tips Section */}
      <div className="bg-interview-accent/10 border border-interview-accent/20 rounded-xl p-4">
        <h4 className="text-interview-text-primary font-semibold mb-3 flex items-center gap-2">
          <User className="w-4 h-4 text-interview-accent" />
          Recording Tips
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-interview-text-secondary">
          {[
            "Speak clearly and at moderate pace",
            "Ensure good lighting for video",
            "Minimize background noise",
            "Maintain eye contact with camera",
          ].map((tip, i) => (
            <div key={i} className="flex items-start gap-2">
              <div className="w-1 h-1 bg-interview-accent rounded-full mt-2 flex-shrink-0" />
              <span>{tip}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecordAnswer;
