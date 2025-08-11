  import React, { useState } from "react";
  import { Input } from "@/components/ui/input";
  import { Button } from "@/components/ui/button";
  import { Textarea } from "@/components/ui/textarea";
  import { useUser } from "@clerk/nextjs";
  import { useRouter } from "next/navigation";
  import { nanoid } from "nanoid";
  import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog";
  import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
  import { LoaderCircle, Plus, Sparkles } from "lucide-react";

  const Addinterview = () => {
    const [usetrigger, setUsetrigger] = useState(false);
    const [jobTitle, setJobTitle] = useState("");
    const [jobDescription, setJobDescription] = useState("");
    const [preparationLevel, setPreparationLevel] = useState("");
    const [loading, setloading] = useState(false);
    const router = useRouter();

    const user = useUser();

    const isFormValid = jobTitle && jobDescription && preparationLevel;

    const handleSubmit = async (e) => {
      setloading(true);
      e.preventDefault();
      if (!isFormValid) return;

      try {
        const response = await fetch("http://localhost:3000/api/gemini", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            jobTitle,
            jobDescription,
            preparationLevel: preparationLevel,
            questioncount: process.env.NEXT_PUBLIC_CLERK_INTERVIEW_COUNT,
          }),
        });

        const data = await response.json();
        console.log(data);
        const cleanedText = data.data
          .replace(/```json/g, "")
          .replace(/```/g, "")
          .trim();
        const parsed = JSON.parse(cleanedText);
        const id = nanoid(10);

        // Save the interview data to the database
        
        const databaseresponse = await fetch(
          "http://localhost:3000/api/save-interview",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              jobTitle,
              jobDescription,
              preparationLevel: preparationLevel,
              jobResponse: parsed,
              createdBy: user.user.primaryEmailAddress.emailAddress,
              mockId: id
            }),
          }
        );

          //after saving to db, redirect to interview page
          router.push('/dashboard/interview/'+id);
        
      } catch (error) {
        console.log("Error generating questions:", error);
      }

      setUsetrigger(false);
      setJobTitle("");
      setJobDescription("");
      setPreparationLevel("");
      setloading(false);
    };

    return (
      <div className="flex items-center  gap-4 justify-start min-h-[220px]">
        <div
          onClick={() => setUsetrigger(true)}
          className="w-fit sm:w-80 h-44 flex flex-col items-center justify-center cursor-pointer 
                    bg-gradient-to-br from-primary/20 via-primary/10 to-transparent 
                    border border-primary/20 rounded-2xl 
                    hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] hover:-translate-y-2 
                    transition-all duration-300 p-4 text-center group relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative z-10">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
              <Plus className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-foreground mb-2">
              Add New Interview
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-muted-foreground">
              Start your AI-powered interview experience
            </p>
          </div>
        </div>

        <Dialog open={usetrigger} onOpenChange={setUsetrigger}>
          <DialogContent className="max-w-lg w-full p-0 bg-background  backdrop-blur-sm rounded-2xl shadow-elegant border border-primary/20 overflow-hidden">
            <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-6 border-b border-primary/10">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-foreground flex items-center gap-2">
                  <Sparkles className="w-6 h-6 text-primary" />
                  Create Interview Experience
                </DialogTitle>
                <DialogDescription className="text-muted-foreground mt-2">
                  Tell us about your target role and we'll create a personalized interview experience
                </DialogDescription>
              </DialogHeader>
            </div>
            <form name="info" className="p-6 space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-foreground">
                  Job Title
                </label>
                <Input
                  placeholder="e.g. Full Stack Developer, Data Scientist, Product Manager"
                  required
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  className="bg-background/50 border-primary/20 focus:border-primary/40 transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-foreground">
                  Job Description & Requirements
                </label>
                <Textarea
                  placeholder="Describe the role, key responsibilities, and specific skills you'd like to focus on. For example: 'Senior React developer position focusing on state management, performance optimization, and team leadership skills...'"
                  required
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  className="min-h-[120px] bg-background/50 border-primary/20 focus:border-primary/40 transition-colors resize-none"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-foreground">
                  Hardness Level
                </label>
                <Select value={preparationLevel} onValueChange={setPreparationLevel} required>
                  <SelectTrigger className="w-full bg-background/50 border-primary/20 focus:border-primary/40 transition-colors">
                    <SelectValue placeholder="Select your Hardness level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner </SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-primary/10">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setUsetrigger(false)}
                  className="border-primary/20 hover:bg-primary/10 transition-colors"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="relative overflow-hidden group bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-6 py-2.5 rounded-lg font-semibold transition-all duration-300 hover:shadow-[0_0_20px_rgba(34,197,94,0.4)] hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={loading || !isFormValid}
                >
                  {loading ? (
                    <>
                      <LoaderCircle className="animate-spin h-5 w-5 mr-2" />
                      Generating AI Interview
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5 mr-2" />
                      Start AI Interview
                    </>
                  )}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    );
  };

  export default Addinterview;
