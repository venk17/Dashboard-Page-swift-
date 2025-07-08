import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from "../assets/logo.png";

const Header = ({ user }) => {
  const navigate = useNavigate();

  const getInitials = (name) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map(word => word.charAt(0).toUpperCase())
      .join('')
      .substring(0, 2);
  };

  const handleProfileClick = () => {
    navigate('/profile');
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <header className="bg-slate-800 text-white px-3 py-3 sm:px-4 sm:py-3">
      <div className="flex items-center justify-between h-12 sm:h-14">
        <div 
          className="flex items-center cursor-pointer h-full"
          onClick={handleLogoClick}
        >
          <img 
            src={logo} 
            alt="Logo" 
            className="h-full w-auto object-contain"
          />
        </div>
        
        {user && (
          <div 
            className="flex items-center space-x-2 cursor-pointer hover:bg-slate-700 rounded-lg px-2 py-1 transition-colors h-full"
            onClick={handleProfileClick}
          >
            <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center text-sm font-medium">
              {getInitials(user.name)}
            </div>
            <span className="text-sm font-medium hidden sm:block">
              {user.name || 'User'}
            </span>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;