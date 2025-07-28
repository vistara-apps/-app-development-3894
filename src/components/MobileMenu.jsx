import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, MessageCircle, Trophy, User, Database, Crown } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout, setShowAuthModal } = useAuth();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <>
      {/* Mobile Menu Button */}
      <button 
        className="mobile-menu-button md:hidden"
        onClick={toggleMenu}
        aria-label="Toggle mobile menu"
        aria-expanded={isOpen}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={closeMenu}
        />
      )}

      {/* Mobile Menu */}
      <div className={`
        fixed top-0 right-0 h-full w-80 max-w-full
        bg-glass backdrop-blur-20 border-l border-primary
        transform transition-transform duration-300 ease-in-out
        z-50 md:hidden
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-secondary">
            <Link to="/" className="logo text-xl" onClick={closeMenu}>
              SportsTalk
            </Link>
            <button 
              onClick={closeMenu}
              className="p-2 rounded-lg hover:bg-glass transition-colors"
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 px-6 py-8">
            <div className="space-y-4">
              <Link 
                to="/debates" 
                className={`mobile-nav-link ${isActive('/debates') ? 'active' : ''}`}
                onClick={closeMenu}
              >
                <MessageCircle size={20} />
                <span>Debates</span>
              </Link>
              
              <Link 
                to="/data" 
                className={`mobile-nav-link ${isActive('/data') ? 'active' : ''}`}
                onClick={closeMenu}
              >
                <Database size={20} />
                <span>Exclusive Data</span>
              </Link>
              
              <Link 
                to="/premium" 
                className={`mobile-nav-link ${isActive('/premium') ? 'active' : ''}`}
                onClick={closeMenu}
              >
                <Crown size={20} />
                <span>Premium</span>
              </Link>

              {user && (
                <Link 
                  to="/profile" 
                  className={`mobile-nav-link ${isActive('/profile') ? 'active' : ''}`}
                  onClick={closeMenu}
                >
                  <User size={20} />
                  <span>Profile</span>
                </Link>
              )}
            </div>
          </nav>

          {/* User Section */}
          <div className="p-6 border-t border-secondary">
            {user ? (
              <div className="space-y-4">
                {/* Points Display */}
                <div className="flex items-center justify-center gap-2 p-3 bg-gradient-to-r from-primary-500/20 to-secondary-500/20 rounded-full">
                  <Trophy size={16} />
                  <span className="font-semibold">{user.debatePoints} pts</span>
                </div>
                
                {/* Logout Button */}
                <button 
                  onClick={() => {
                    logout();
                    closeMenu();
                  }}
                  className="btn btn-secondary w-full"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button 
                onClick={() => {
                  setShowAuthModal(true);
                  closeMenu();
                }}
                className="btn btn-primary w-full"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .mobile-nav-link {
          display: flex;
          align-items: center;
          gap: var(--space-3);
          padding: var(--space-3) var(--space-4);
          border-radius: var(--radius-lg);
          color: var(--color-text-secondary);
          text-decoration: none;
          font-weight: var(--font-weight-medium);
          transition: all var(--transition-base);
          width: 100%;
        }

        .mobile-nav-link:hover {
          color: var(--color-text-primary);
          background-color: var(--color-bg-glass);
        }

        .mobile-nav-link.active {
          color: var(--color-primary-400);
          background-color: rgba(102, 126, 234, 0.1);
        }

        .mobile-menu-button {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border: none;
          background: transparent;
          color: var(--color-text-primary);
          cursor: pointer;
          border-radius: var(--radius-lg);
          transition: background-color var(--transition-base);
        }

        .mobile-menu-button:hover {
          background-color: var(--color-bg-glass);
        }

        .bg-glass {
          background: var(--color-bg-glass);
        }

        .backdrop-blur-20 {
          backdrop-filter: blur(20px);
        }

        .border-primary {
          border-color: var(--color-border-primary);
        }

        .border-secondary {
          border-color: var(--color-border-secondary);
        }
      `}</style>
    </>
  );
}

export default MobileMenu;

