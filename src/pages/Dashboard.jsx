import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import LoadingSpinner from '../components/LoadingSpinner';
import Pagination from '../components/Pagination';
import SortButton from '../components/SortButton';

const Dashboard = () => {
  const navigate = useNavigate();
  const [comments, setComments] = useState([]);
  const [filteredComments, setFilteredComments] = useState([]);
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // State for filters and pagination
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [sortConfig, setSortConfig] = useState({ column: null, direction: null });

  // Load persisted state from localStorage
  useEffect(() => {
    const savedFilters = localStorage.getItem('dashboardFilters');
    if (savedFilters) {
      const filters = JSON.parse(savedFilters);
      setSearchTerm(filters.searchTerm || '');
      setCurrentPage(filters.currentPage || 1);
      setPageSize(filters.pageSize || 10);
      setSortConfig(filters.sortConfig || { column: null, direction: null });
    }
  }, []);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    const filters = {
      searchTerm,
      currentPage,
      pageSize,
      sortConfig
    };
    localStorage.setItem('dashboardFilters', JSON.stringify(filters));
  }, [searchTerm, currentPage, pageSize, sortConfig]);

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch comments and user data in parallel
        const [commentsResponse, usersResponse] = await Promise.all([
          fetch('https://jsonplaceholder.typicode.com/comments'),
          fetch('https://jsonplaceholder.typicode.com/users')
        ]);

        if (!commentsResponse.ok || !usersResponse.ok) {
          throw new Error('Failed to fetch data');
        }

        const [commentsData, usersData] = await Promise.all([
          commentsResponse.json(),
          usersResponse.json()
        ]);

        setComments(commentsData);
        setUsers(usersData);
        setUser(usersData[0]); // Use first user as specified
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter and sort comments
  useEffect(() => {
    let filtered = comments.filter(comment => {
      const searchLower = searchTerm.toLowerCase();
      return (
        comment.name.toLowerCase().includes(searchLower) ||
        comment.email.toLowerCase().includes(searchLower) ||
        comment.body.toLowerCase().includes(searchLower)
      );
    });

    // Apply sorting
    if (sortConfig.column && sortConfig.direction) {
      filtered.sort((a, b) => {
        let aValue, bValue;
        
        switch (sortConfig.column) {
          case 'Post ID':
            aValue = a.postId;
            bValue = b.postId;
            break;
          case 'Name':
            aValue = a.name.toLowerCase();
            bValue = b.name.toLowerCase();
            break;
          case 'Email':
            aValue = a.email.toLowerCase();
            bValue = b.email.toLowerCase();
            break;
          default:
            return 0;
        }

        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    setFilteredComments(filtered);
  }, [comments, searchTerm, sortConfig]);

  // Handle search
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };

  // Handle sorting
  const handleSort = (column) => {
    let direction = 'asc';
    
    if (sortConfig.column === column) {
      if (sortConfig.direction === 'asc') {
        direction = 'desc';
      } else if (sortConfig.direction === 'desc') {
        direction = null;
      }
    }
    
    setSortConfig({ 
      column: direction ? column : null, 
      direction 
    });
  };

  // Handle pagination
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (newPageSize) => {
    setPageSize(newPageSize);
    setCurrentPage(1);
  };

  // Handle row click to navigate to profile
  const handleRowClick = (comment) => {
    // Store the selected comment data for the profile page
    localStorage.setItem('selectedComment', JSON.stringify(comment));
    navigate('/profile');
  };

  // Calculate pagination
  const totalPages = Math.ceil(filteredComments.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentComments = filteredComments.slice(startIndex, endIndex);

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-red-600 text-center p-4">Error: {error}</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} />
      
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 ">
        {/* Search and Controls */}
        <div className="mb-4 sm:mb-6 flex flex-col space-y-3 sm:space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
            <div className="flex flex-wrap items-center gap-2 sm:gap-4 order-1">
              <SortButton 
                column="Post ID" 
                currentSort={sortConfig} 
                onSort={handleSort} 
              />
              <SortButton 
                column="Name" 
                currentSort={sortConfig} 
                onSort={handleSort} 
              />
              <SortButton 
                column="Email" 
                currentSort={sortConfig} 
                onSort={handleSort} 
              />
            </div>
            
            <div className="relative order-2 sm:order-3 w-full sm:w-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                placeholder="Search name, email, comment..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full text-sm"
              />
            </div>
          </div>
        </div>

        {/* Comments Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100 border-b border-gray-200">
                  <tr>
                    <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-700">Post ID</th>
                    <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-700">Name</th>
                    <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-700 hidden sm:table-cell">Email</th>
                    <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-700">Comment</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {currentComments.map((comment) => (
                    <tr 
                      key={comment.id} 
                      className="hover:bg-blue-50 transition-colors cursor-pointer active:bg-blue-100"
                      onClick={() => handleRowClick(comment)}
                    >
                      <td className="px-2 sm:px-4 py-3 sm:py-4 text-xs sm:text-sm text-gray-900 font-medium">{comment.postId}</td>
                      <td className="px-2 sm:px-4 py-3 sm:py-4 text-xs sm:text-sm text-gray-900 font-medium">
                        <div className="truncate max-w-[120px] sm:max-w-none">{comment.name}</div>
                        <div className="text-xs text-gray-500 sm:hidden truncate max-w-[120px]">{comment.email}</div>
                      </td>
                      <td className="px-2 sm:px-4 py-3 sm:py-4 text-xs sm:text-sm text-gray-600 hidden sm:table-cell">{comment.email}</td>
                      <td className="px-2 sm:px-4 py-3 sm:py-4 text-xs sm:text-sm text-gray-600">
                        <div className="truncate max-w-[150px] sm:max-w-md">
                        {comment.body}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {filteredComments.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <div className="text-sm sm:text-base">No comments found matching your search criteria.</div>
              </div>
            )}
        </div>
        
        {/* Pagination - Outside of table */}
        {filteredComments.length > 0 && (
          <div className="mt-3 sm:mt-4">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              pageSize={pageSize}
              totalItems={filteredComments.length}
              onPageChange={handlePageChange}
              onPageSizeChange={handlePageSizeChange}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;