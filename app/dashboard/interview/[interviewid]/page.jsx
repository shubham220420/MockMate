"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Play, AlertCircle, Camera } from "lucide-react";
import Webcam from "react-webcam";
import Link from "next/link";

const Interview = () => {
  const params = useParams();
  const router = useRouter();
  const id = params?.interviewid;
  const [interviewData, setInterviewData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cameraChecked, setCameraChecked] = useState(false);
  const [cameraError, setCameraError] = useState(false);

  const webcamRef = useRef(null);

  const fetchInterview = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:3000/api/get-interview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const data = await response.json();

      if (data.success && data.interview) {
        setInterviewData(data.interview);
        setError(null);
      } else {
        alert("❌ Interview not found!");
        router.push("/dashboard");
        return;
      }
    } catch (error) {
      alert("❌ Failed to load interview data. Please try again.");
      router.push("/dashboard");
      return;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchInterview();
  }, [id]);

  const handleUserMediaError = useCallback(() => {
    setCameraError(true);
  }, []);

  const handleCheckCamera = () => {
    if (cameraChecked) {
      setCameraChecked(false);
      setCameraError(false);
    } else {
      setCameraChecked(true);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-mockmate-bg flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-primary font-medium">Loading interview...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-mockmate-bg flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">❌</span>
          </div>
          <h2 className="text-xl font-bold text-red-700 mb-2">Interview Not Found</h2>
          <p className="text-red-600 mb-4">This interview may have been deleted or doesn't exist.</p>
          <Link href="/dashboard">
            <Button className="bg-primary hover:bg-primary/90 text-white">Go to Dashboard</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-mockmate-bg">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-mockmate-text mb-12">
          Let's Get Started
        </h1>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8">
          {/* LEFT SIDE */}
          <div className="space-y-6">
            <Card className="bg-mockmate-surface border-mockmate-border p-6 sm:p-8 min-h-[200px] flex flex-col justify-center">
              <div className="space-y-4 text-sm sm:text-base">
                <div>
                  <span className="font-semibold text-primary">Job Position: </span>
                  <span className="text-mockmate-text-muted">{interviewData?.jobTitle}</span>
                </div>
                <div>
                  <span className="font-semibold text-primary">Description: </span>
                  <span className="text-mockmate-text-muted">{interviewData?.jobDescription}</span>
                </div>
                <div>
                  <span className="font-semibold text-primary">Preparation Level: </span>
                  <span className="text-mockmate-text-muted">{interviewData?.preparationLevel}</span>
                </div>
              </div>
            </Card>

            <Card className="bg-yellow-500/10 border-yellow-500/20 p-6 sm:p-8 min-h-[200px] flex flex-col justify-center">
              <div className="flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-yellow-500 mt-1" />
                <div>
                  <div className="text-yellow-500 font-bold mb-3">IMPORTANT NOTES:</div>
                  <ul className="space-y-2 text-sm text-yellow-200">
                    <li>• We do <strong>not</strong> record your video</li>
                    <li>• This interview contains <strong>5 questions</strong></li>
                    <li>• You will get your <strong>report</strong> at the end</li>
                    <li>• You can <strong>close</strong> your camera if you want</li>
                    <li>• Do not <strong>switch tabs</strong> during the interview</li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>

          {/* RIGHT SIDE - CAMERA PREVIEW */}
          <div className="w-full flex flex-col items-center justify-center">
            <Card className="bg-mockmate-surface border-mockmate-border w-full p-4 sm:p-6 flex flex-col items-center justify-center space-y-6">
              <div className="w-full aspect-video rounded-lg overflow-hidden">
                {cameraChecked ? (
                  cameraError ? (
                    <div className="text-red-500 text-center p-4">
                      ❌ Unable to access your camera. Please check browser permissions.
                    </div>
                  ) : (
                    <Webcam
                      audio={false}
                      ref={webcamRef}
                      mirrored={true}
                      screenshotFormat="image/jpeg"
                      onUserMediaError={handleUserMediaError}
                      className="w-full h-full object-cover"
                      videoConstraints={{ facingMode: "user" }}
                    />
                  )
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-mockmate-text-muted text-sm sm:text-base text-center">
                    Click below to check your camera.
                  </div>
                )}
              </div>

              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
                  <Camera className="w-8 h-8 text-primary animate-pulse" />
                </div>
                <h3 className="text-xl font-semibold text-mockmate-text">Camera Preview</h3>
                <Button
                  onClick={handleCheckCamera}
                  className={`cursor-pointer ${cameraChecked ? "bg-red-600 hover:bg-destructive" : "bg-primary hover:bg-primary/90 text-white"} `}
                >
                  {cameraChecked ? "Close Camera" : "Check Camera"}
                </Button>
              </div>
            </Card>
          </div>
        </div>

        {/* Start Interview Button */}
        <div className="text-center mt-12">
          <Link href={`/dashboard/interview/${id}/start`} passHref>
            <Button
              as="a"
              className="bg-primary cursor-pointer hover:bg-primary/90 text-primary-foreground px-12 py-6 text-xl font-bold rounded-full shadow-green-lg hover:shadow-green transition-all duration-300 hover:scale-105"
            >
              <Play className="w-6 h-6 mr-3" />
              Start Interview
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Interview;

