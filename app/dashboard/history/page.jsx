"use client"

import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";
import {
  Calendar,
  Briefcase,
  ArrowRight,
  Trash2,
  MoreVertical,
  BarChart3,
  Clock,
  Target
} from "lucide-react";
import Link from "next/link";

const History = () => {
  const [list, setUserList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [openMenu, setOpenMenu] = useState(null);
  const user = useUser();
  const email = user.user?.primaryEmailAddress?.emailAddress;

  useEffect(() => {
    const GetResponse = async () => {
      if (!email) return;

      try {
        setLoading(true);
        const response = await fetch(`/api/get-interview?email=${email}`, {
          method: "GET",
        });
        const data = await response.json();

        if (data.success) {
          setUserList(data.list || []);
        } else {
          console.error("Failed to fetch interviews:", data.error);
        }
      } catch (err) {
        console.log("Cannot Fetch user Interview List due to:", err);
      } finally {
        setLoading(false);
      }
    };

    GetResponse();
  }, [email]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (openMenu && !event.target.closest(".dropdown-menu")) {
        setOpenMenu(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openMenu]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return (
      date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }) +
      " " +
      date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      })
    );
  };
  const updateinterview = async (mockId) => {
    
    const useranswer = "";

    try{
      const response = await fetch(`/api/get-interview`,{
        method : 'PATCH',
        headers : {
          'Content-Type' : 'application/json'
        },
        body : JSON.stringify({mockId,
          AIresponse:{
            rating :0,
            areas_of_improvement :"",
            feedback :"",
          },useranswer})
      })
    }
    catch(error){
      console.error("Error updating interview:", error);
      alert("Failed to update interview. Please try again.");
    }
  }

  const handleDelete = async (mockId) => {
    if (!confirm("Are you sure you want to delete this interview? This action cannot be undone.")) {
      return;
    }

    try {
      setDeletingId(mockId);
      const response = await fetch(`/api/delete-interview`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ mockId }),
      });

      if (response.ok) {
        setUserList((prevList) => prevList.filter((interview) => interview.mockId !== mockId));
      } else {
        alert("Failed to delete interview. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting interview:", error);
      alert("Failed to delete interview. Please try again.");
    } finally {
      setDeletingId(null);
    }
  };

  const stats = [
    {
      icon: <BarChart3 className="w-5 h-5" />, label: "Total Interviews", value: list.length.toString(), color: "from-blue-500 to-blue-600"
    },
    {
      icon: <Target className="w-5 h-5" />, label: "Completed", value: list.length.toString(), color: "from-green-500 to-green-600"
    },
    {
      icon: <Clock className="w-5 h-5" />, label: "This Month", value: list.filter(item => {
        const itemDate = new Date(item.createdAt);
        const now = new Date();
        return itemDate.getMonth() === now.getMonth() && itemDate.getFullYear() === now.getFullYear();
      }).length.toString(), color: "from-purple-500 to-purple-600"
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-mockmate-bg from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-400"></div>
          <p className="text-gray-300">Loading your interview history...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-mockmate-bg from-slate-900 via-slate-800 to-slate-900">
      {/* Animated background elements - Same as Dashboard */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-green-500/20 to-blue-500/20 rounded-full blur-3xl animate-pulse pointer-events-none"></div>
      </div>

      <div className="relative z-10 overflow-hidden">
        <div className="px-4 sm:px-8 py-8">
          <div className="max-w-7xl mx-auto">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
              <div className="flex items-center gap-4">
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    Interview History
                  </h1>
                  <p className="text-gray-400 mt-2 text-lg">
                    Track your progress and review past interviews
                  </p>
                </div>
              </div>
            </div>

            {/* Stats Grid - Same styling as Dashboard */}
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

            {/* Content Section */}
            {list.length === 0 ? (
              <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 text-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-gray-500/20 to-gray-600/20 flex items-center justify-center mx-auto mb-6">
                  <Briefcase className="h-10 w-10 text-gray-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">No interviews yet</h3>
                <p className="text-gray-400 text-lg mb-8 max-w-md mx-auto">
                  Start your first mock interview to see your history here and track your progress.
                </p>
                <Link href="/dashboard">
                  <Button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white border-0 px-8 py-3 text-lg">
                    Start Your First Interview
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <h2 className="text-2xl font-bold text-white">Your Interview Sessions</h2>
                </div>

                <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                  {list.map((interview, index) => (
                    <div 
                      key={interview.mockId || index} 
                      className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-xl hover:border-slate-600/50 transition-all duration-300 hover:shadow-lg hover:shadow-slate-700/20 group"
                    >
                      <div className="p-6">
                        <div className="flex items-start justify-between gap-2 mb-4">
                          <h3 className="text-lg font-semibold text-white line-clamp-2 flex-1 group-hover:text-green-400 transition-colors">
                            {interview.jobTitle || 'Interview Session'}
                          </h3>
                          <div className="relative">
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-8 w-8 p-0 text-gray-400 hover:text-white hover:bg-slate-700/50"
                              onClick={() => setOpenMenu(openMenu === interview.mockId ? null : interview.mockId)}
                            >
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                            {openMenu === interview.mockId && (
                              <div className="dropdown-menu absolute right-0 top-10 z-10 bg-slate-800 border border-slate-700 rounded-lg shadow-xl py-2 min-w-[120px]">
                                <button
                                  className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 flex items-center gap-2 transition-colors"
                                  onClick={() => {
                                    setOpenMenu(null);
                                    handleDelete(interview.mockId);
                                  }}
                                  disabled={deletingId === interview.mockId}
                                >
                                  {deletingId === interview.mockId ? (
                                    <div className="animate-spin rounded-full h-3 w-3 border-b border-red-400"></div>
                                  ) : (
                                    <Trash2 className="h-3 w-3" />
                                  )}
                                  Delete
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          <p className="text-sm text-gray-400 line-clamp-3">
                            {interview.jobDescription || 'No description available'}
                          </p>
                          
                          <div className="flex items-center justify-between">
                            <div className="text-xs text-gray-500 bg-slate-700/50 px-3 py-1 rounded-full">
                              Level: {interview.preparationLevel || 'Not specified'}
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between gap-2 pt-4 border-t border-slate-700/50">
                            <div className="flex items-center space-x-1 text-xs text-gray-500">
                              <Calendar className="h-3 w-3" />
                              <span>{formatDate(interview.createdAt)}</span>
                            </div>
                          </div>
                          
                          <div className="flex gap-2 pt-2">
                            <Link href={`/dashboard/interview/${interview.mockId}/report`} className="flex-1">
                              <Button 
                             
                                size="sm" 
                                variant="outline" 
                                className="w-full cursor-pointer bg-slate-700/30 border-slate-600/50 text-gray-300 hover:bg-slate-600/50 rounded-sm hover:text-white text-xs"
                                
                              >
                                <BarChart3 className="h-3 w-3 mr-1" />
                                View Report
                              </Button>
                            </Link>
                            <Link href={`/dashboard/interview/${interview.mockId}`} className="flex-1">
                              <Button 
                               onClick={()=>{updateinterview(interview.mockId)}}
                                size="sm" 
                                className="w-full cursor-pointer bg-gradient-to-r rounded-sm from-green-500/80 to-green-600/80 hover:from-green-500 hover:to-green-600 text-white border-0  transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]text-xs"
                              >
                                <ArrowRight className="h-3 w-3 mr-1" />
                                Retry
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Bottom animated element - Same as Dashboard */}
        <div className="absolute -bottom-40 left-0 w-50 h-50 bg-gradient-to-tr from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse pointer-events-none" style={{ animationDelay: '2s' }}></div>
      </div>
    </div>
  );
};

export default History;
