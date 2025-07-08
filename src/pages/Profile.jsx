import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Header from '../components/Header';
import LoadingSpinner from '../components/LoadingSpinner';

const Profile = () => {
  const [commentData, setCommentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const getInitials = (name) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map(word => word.charAt(0).toUpperCase())
      .join('')
      .substring(0, 2);
  };

  useEffect(() => {
    const loadCommentData = async () => {
      try {
        setLoading(true);
        
        // Check if there's a selected comment from localStorage
        const selectedComment = localStorage.getItem('selectedComment');
        if (selectedComment) {
          setCommentData(JSON.parse(selectedComment));
          setLoading(false);
          return;
        }
        
        // Fallback to fetching first comment from API
        const response = await fetch('https://jsonplaceholder.typicode.com/comments');
        if (!response.ok) {
          throw new Error('Failed to fetch comment data');
        }
        const comments = await response.json();
        setCommentData(comments[0]);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadCommentData();
  }, []);

  const handleBackClick = () => {
    navigate('/');
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-red-600 text-center p-4">Error: {error}</div>;
  if (!commentData) return <div className="text-center p-4">No comment data available</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={{ name: commentData.name, email: commentData.email }} />
      
      <div className="max-w-4xl mx-auto px-4 py-6 sm:px-6">
        <div className="mb-6">
          <button
            onClick={handleBackClick}
            className="flex items-center space-x-1 sm:space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft size={16} className="sm:w-5 sm:h-5" />
            <span className="text-sm sm:text-base">Comment Details</span>
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 mb-8">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-200 rounded-full flex items-center justify-center text-lg sm:text-2xl font-bold text-gray-600 mb-4 sm:mb-0 mx-auto sm:mx-0">
                {getInitials(commentData.name)}
              </div>
              <div className="text-center sm:text-left">
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">{commentData.name}</h1>
                <p className="text-sm sm:text-base text-gray-600">{commentData.email}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:gap-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-500 mb-2">
                    Comment ID
                  </label>
                  <div className="px-3 py-2 sm:px-4 sm:py-3 bg-gray-50 rounded-lg text-sm sm:text-base text-gray-900">
                    {commentData.id}
                  </div>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-500 mb-2">
                    Post ID
                  </label>
                  <div className="px-3 py-2 sm:px-4 sm:py-3 bg-gray-50 rounded-lg text-sm sm:text-base text-gray-900">
                    {commentData.postId}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-500 mb-2">
                    Name
                  </label>
                  <div className="px-3 py-2 sm:px-4 sm:py-3 bg-gray-50 rounded-lg text-sm sm:text-base text-gray-900">
                    {commentData.name}
                  </div>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-500 mb-2">
                    Email
                  </label>
                  <div className="px-3 py-2 sm:px-4 sm:py-3 bg-gray-50 rounded-lg text-sm sm:text-base text-gray-900 break-all">
                    {commentData.email}
                  </div>
                </div>
              </div>

              <div>
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-500 mb-2">
                    Comment
                  </label>
                  <div className="px-3 py-2 sm:px-4 sm:py-3 bg-gray-50 rounded-lg text-sm sm:text-base text-gray-900 min-h-[100px] sm:min-h-[120px]">
                    {commentData.body}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;