import { Link, useLocation } from 'react-router-dom';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { MessageCircle, Trophy, User, Database, Crown } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

function Navbar() {
  const { user, logout, setShowAuthModal } = useAuth();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-content">
          <Link to="/" className="logo">
            SportsTalk
          </Link>
          
          <div className="nav-links">
            <Link 
              to="/debates" 
              className={`nav-link ${isActive('/debates') ? 'active' : ''}`}
            >
              <MessageCircle size={18} />
              Debates
            </Link>
            
            <Link 
              to="/data" 
              className={`nav-link ${isActive('/data') ? 'active' : ''}`}
            >
              <Database size={18} />
              Exclusive Data
            </Link>
            
            <Link 
              to="/premium" 
              className={`nav-link ${isActive('/premium') ? 'active' : ''}`}
            >
              <Crown size={18} />
              Premium
            </Link>

            {user ? (
              <>
                <div className="points-display">
                  <Trophy size={16} />
                  {user.debatePoints} pts
                </div>
                
                <Link 
                  to="/profile" 
                  className={`nav-link ${isActive('/profile') ? 'active' : ''}`}
                >
                  <User size={18} />
                  Profile
                </Link>
                
                <button 
                  onClick={logout}
                  className="btn btn-secondary"
                >
                  Logout
                </button>
              </>
            ) : (
              <button 
                onClick={() => setShowAuthModal(true)}
                className="btn btn-primary"
              >
                Sign In
              </button>
            )}
            
            <ConnectButton />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;