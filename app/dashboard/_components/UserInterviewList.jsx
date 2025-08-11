"use client"
import React, { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Briefcase, ArrowRight, Trash2, MoreVertical } from "lucide-react";
import Link from "next/link";

const UserInterviewList = () => {
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

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (openMenu && !event.target.closest('.dropdown-menu')) {
        setOpenMenu(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openMenu]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }) + ' ' + date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleDelete = async (mockId) => {
    if (!confirm('Are you sure you want to delete this interview? This action cannot be undone.')) {
      return;
    }

    try {
      setDeletingId(mockId);
      // TODO: Replace with your actual API endpoint
      const response = await fetch(`/api/delete-interview`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mockId }),
      });

      if (response.ok) {
        // Remove the interview from the list
        setUserList(prevList => prevList.filter(interview => interview.mockId !== mockId));
      } else {
        alert('Failed to delete interview. Please try again.');
      }
    } catch (error) {
      console.error('Error deleting interview:', error);
      alert('Failed to delete interview. Please try again.');
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Recent Interviews</h2>
        <div className="text-xs sm:text-sm text-gray-500">
          {list.length} interview{list.length !== 1 ? 's' : ''} found
        </div>
      </div>

      {list.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-8 sm:py-12 px-4 sm:px-6">
            <Briefcase className="h-8 w-8 sm:h-12 sm:w-12 text-gray-400 mb-3 sm:mb-4" />
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 text-center">No interviews yet</h3>
            <p className="text-sm sm:text-base text-gray-500 text-center mb-4 px-2">
              Start your first mock interview to see your history here.
            </p>
            <Link href="/dashboard">
              <Button className="w-full sm:w-auto">
                Start Interview
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((interview, index) => (
            <Card key={interview.mockId || index} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-2 sm:pb-3 px-4 sm:px-6">
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-sm sm:text-lg font-semibold text-gray-900 line-clamp-2 flex-1">
                    {interview.jobTitle || 'Interview'}
                  </CardTitle>
                  <div className="relative">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-6 w-6 p-0 hover:bg-gray-100"
                      onClick={() => setOpenMenu(openMenu === interview.mockId ? null : interview.mockId)}
                    >
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                    {openMenu === interview.mockId && (
                      <div className="dropdown-menu absolute right-0 top-8 z-10 bg-white border border-gray-200 rounded-md shadow-lg py-1 min-w-[120px]">
                        <button
                          className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                          onClick={() => {
                            setOpenMenu(null);
                            handleDelete(interview.mockId);
                          }}
                          disabled={deletingId === interview.mockId}
                        >
                          {deletingId === interview.mockId ? (
                            <div className="animate-spin rounded-full h-3 w-3 border-b border-red-600"></div>
                          ) : (
                            <Trash2 className="h-3 w-3" />
                          )}
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0 px-4 sm:px-6">
                <div className="space-y-2 sm:space-y-3">
                  <div>
                    <p className="text-xs sm:text-sm text-gray-600 line-clamp-3">
                      {interview.jobDescription || 'No description available'}
                    </p>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0 pt-2">
                    <div className="text-xs text-gray-500">
                      Level: {interview.preparationLevel || 'Not specified'}
                    </div>
                    <div className="flex items-center gap-2">
                      <Link href={`/dashboard/interview/${interview.mockId}/report`}>
                        <Button size="sm" variant="outline" className="flex items-center space-x-1 text-xs">
                          <span>View Details</span>
                          <ArrowRight className="h-3 w-3" />
                        </Button>
                      </Link>
                      <Link href={`/dashboard/interview/${interview.mockId}`}>
                        <Button size="sm" variant="outline" className="flex items-center space-x-1 text-xs">
                          <span>Start Again</span>
                          <ArrowRight className="h-3 w-3" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                  <div className="flex items-center justify-end pt-2 border-t border-gray-100 mt-2">
                    <div className="flex items-center space-x-1 text-xs text-gray-500">
                      <Calendar className="h-3 w-3" />
                      <span className="hidden sm:inline">{formatDate(interview.createdAt)}</span>
                      <span className="sm:hidden">{formatDate(interview.createdAt).split(' ')[1]}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserInterviewList;
