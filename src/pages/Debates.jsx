import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Users, Clock, Trophy, Filter } from 'lucide-react';
import { useData } from '../contexts/DataContext';
import { useAuth } from '../contexts/AuthContext';
import CreateDebateModal from '../components/CreateDebateModal';
import { formatDistanceToNow } from 'date-fns';

function Debates() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [filter, setFilter] = useState('all'); // all, active, completed
  const { debates } = useData();
  const { user, setShowAuthModal } = useAuth();

  const filteredDebates = debates.filter(debate => {
    if (filter === 'all') return true;
    return debate.status === filter;
  });

  const handleCreateDebate = () => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }
    setShowCreateModal(true);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return '#4ade80';
      case 'completed': return '#888';
      default: return '#667eea';
    }
  };

  return (
    <div style={{ padding: '40px 0' }}>
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
          <div>
            <h1 style={{ fontSize: '36px', marginBottom: '8px' }}>Sports Debates</h1>
            <p style={{ color: '#888' }}>Join passionate discussions and earn debate points</p>
          </div>
          
          <button 
            onClick={handleCreateDebate}
            className="btn btn-primary"
          >
            <Plus size={20} />
            Start New Debate
          </button>
        </div>

        {/* Filter Tabs */}
        <div style={{ display: 'flex', gap: '16px', marginBottom: '32px' }}>
          {[
            { key: 'all', label: 'All Debates', icon: Filter },
            { key: 'active', label: 'Active', icon: Clock },
            { key: 'completed', label: 'Completed', icon: Trophy }
          ].map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={filter === key ? 'btn btn-primary' : 'btn btn-secondary'}
              style={{ fontSize: '14px' }}
            >
              <Icon size={16} />
              {label}
            </button>
          ))}
        </div>

        {/* Debates List */}
        <div className="debates-grid">
          {filteredDebates.map(debate => (
            <Link key={debate.id} to={`/debate/${debate.id}`} style={{ textDecoration: 'none' }}>
              <div className="card debate-card">
                <div className="debate-info">
                  <h3>{debate.topic}</h3>
                  <div className="debate-meta">
                    <span style={{ color: getStatusColor(debate.status), fontWeight: '600' }}>
                      {debate.status.toUpperCase()}
                    </span>
                    <span style={{ margin: '0 8px', color: '#555' }}>•</span>
                    <span>{debate.sport}</span>
                    {debate.status === 'active' && (
                      <>
                        <span style={{ margin: '0 8px', color: '#555' }}>•</span>
                        <span>Ends {formatDistanceToNow(debate.endTime, { addSuffix: true })}</span>
                      </>
                    )}
                  </div>
                </div>
                
                <div className="debate-stats">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Users size={16} />
                    {debate.participants}
                  </div>
                  {debate.status === 'completed' && debate.winner && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Trophy size={16} />
                      Winner
                    </div>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filteredDebates.length === 0 && (
          <div style={{ textAlign: 'center', padding: '80px 0' }}>
            <h3 style={{ color: '#888', marginBottom: '16px' }}>No debates found</h3>
            <p style={{ color: '#666' }}>
              {filter === 'all' 
                ? "Be the first to start a debate!"
                : `No ${filter} debates at the moment.`
              }
            </p>
          </div>
        )}

        {showCreateModal && (
          <CreateDebateModal onClose={() => setShowCreateModal(false)} />
        )}
      </div>
    </div>
  );
}

export default Debates;