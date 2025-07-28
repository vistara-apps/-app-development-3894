import { useAuth } from '../contexts/AuthContext';
import { Trophy, MessageCircle, Award, TrendingUp } from 'lucide-react';
import { Navigate } from 'react-router-dom';

function Profile() {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/" replace />;
  }

  const mockStats = {
    totalDebates: 23,
    debatesWon: 8,
    averagePoints: 6.2,
    winRate: 35,
    topCategory: 'Basketball',
    recentActivity: [
      { type: 'debate', title: 'Joined LeBron vs Jordan debate', points: 8, date: '2 hours ago' },
      { type: 'achievement', title: 'Earned 100 debate points', points: 0, date: '1 day ago' },
      { type: 'debate', title: 'Won NFL playoffs prediction debate', points: 15, date: '3 days ago' },
    ]
  };

  return (
    <div style={{ padding: '40px 0' }}>
      <div className="container">
        <div className="card" style={{ marginBottom: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '32px' }}>
            <img 
              src={user.profilePicture} 
              alt={user.username}
              style={{ 
                width: '80px', 
                height: '80px', 
                borderRadius: '50%',
                objectFit: 'cover'
              }}
            />
            <div>
              <h1 style={{ fontSize: '32px', marginBottom: '8px' }}>{user.username}</h1>
              <p style={{ color: '#888', marginBottom: '16px' }}>{user.email}</p>
              <div className="points-display">
                <Trophy size={20} />
                {user.debatePoints} Debate Points
              </div>
            </div>
          </div>

          {user.isPremium && (
            <div className="premium-badge" style={{ display: 'inline-block', marginBottom: '16px' }}>
              Premium Member
            </div>
          )}
        </div>

        {/* Stats Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px', marginBottom: '32px' }}>
          <div className="card" style={{ textAlign: 'center' }}>
            <MessageCircle size={32} style={{ color: '#667eea', marginBottom: '16px' }} />
            <h3>{mockStats.totalDebates}</h3>
            <p style={{ color: '#888' }}>Total Debates</p>
          </div>

          <div className="card" style={{ textAlign: 'center' }}>
            <Award size={32} style={{ color: '#4ade80', marginBottom: '16px' }} />
            <h3>{mockStats.debatesWon}</h3>
            <p style={{ color: '#888' }}>Debates Won</p>
          </div>

          <div className="card" style={{ textAlign: 'center' }}>
            <TrendingUp size={32} style={{ color: '#f59e0b', marginBottom: '16px' }} />
            <h3>{mockStats.averagePoints}/10</h3>
            <p style={{ color: '#888' }}>Avg. Comment Score</p>
          </div>

          <div className="card" style={{ textAlign: 'center' }}>
            <Trophy size={32} style={{ color: '#8b5cf6', marginBottom: '16px' }} />
            <h3>{mockStats.winRate}%</h3>
            <p style={{ color: '#888' }}>Win Rate</p>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="card">
          <h2 style={{ marginBottom: '24px' }}>Recent Activity</h2>
          <div>
            {mockStats.recentActivity.map((activity, index) => (
              <div key={index} style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                padding: '16px',
                backgroundColor: '#2a2a2a',
                borderRadius: '8px',
                marginBottom: '12px'
              }}>
                <div>
                  <p style={{ fontWeight: '600', marginBottom: '4px' }}>{activity.title}</p>
                  <p style={{ color: '#888', fontSize: '14px' }}>{activity.date}</p>
                </div>
                {activity.points > 0 && (
                  <span style={{ 
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: '12px',
                    fontWeight: '600'
                  }}>
                    +{activity.points} pts
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;