import { useState, useEffect } from 'react';
import { FiLogOut, FiEdit } from 'react-icons/fi';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [hoverLogo, setHoverLogo] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // You can replace this with actual logic (like checking auth token/localStorage)
    const userStatus = localStorage.getItem('isLoggedIn');
    setIsLoggedIn(userStatus === 'true');
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
    navigate('/');
  };

  const handleWrite = () => {
    navigate('/blog-write');
  };

  return (
    <nav
      className={`w-full flex items-center justify-between px-6 py-4 bg-white shadow-md fixed top-0 z-50 transition-transform duration-500 ${
        hoverLogo ? '-rotate-x-6' : ''
      }`}
      style={{ transformOrigin: 'top' }}
    >
      {/* Left Links */}
      <div className="flex gap-6 text-lg font-medium">
        {['Home', 'Dashboard', 'Left', 'Right'].map((item, i) => (
          <a key={i} href="#" className="relative group">
            <span>{item}</span>
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-blue-600 transition-all group-hover:w-full duration-300" />
          </a>
        ))}
      </div>

      {/* Center Logo */}
      <div
        onMouseEnter={() => setHoverLogo(true)}
        onMouseLeave={() => setHoverLogo(false)}
        className="text-2xl font-bold tracking-wide cursor-pointer"
      >
        WiseBlogs
      </div>

      {/* Right Buttons (only when logged in) */}
      {isLoggedIn && (
        <div className="flex items-center gap-4">
          {/* Write Button */}
          <button
            onClick={handleWrite}
            className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
          >
            <FiEdit />
            Write
          </button>

          {/* Logout Button */}
          <div className="relative group w-24 h-10 overflow-hidden">
            <button
              onClick={handleLogout}
              className="w-full h-full bg-red-500 text-white rounded-md flex items-center justify-center relative"
            >
              <span className="transition-all duration-300 group-hover:translate-x-20">
                Logout
              </span>
              <FiLogOut className="absolute left-[-30px] text-xl transition-all duration-300 group-hover:left-4" />
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
