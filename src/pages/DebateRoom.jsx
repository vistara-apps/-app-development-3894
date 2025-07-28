import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Send, Users, Clock, Trophy, ArrowLeft } from 'lucide-react';
import { useData } from '../contexts/DataContext';
import { useAuth } from '../contexts/AuthContext';
import { moderateComment } from '../services/aiService';
import { formatDistanceToNow } from 'date-fns';

function DebateRoom() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { debates, joinDebate } = useData();
  const { user, setShowAuthModal, updateUser } = useAuth();
  
  const [debate, setDebate] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock comments for demo
  useEffect(() => {
    const foundDebate = debates.find(d => d.id === parseInt(id));
    if (!foundDebate) {
      navigate('/debates');
      return;
    }
    
    setDebate(foundDebate);

    const mockComments = [
      {
        id: 1,
        content: "LeBron's longevity and ability to adapt his game over 20+ years is unprecedented. His basketball IQ and leadership have been consistent throughout multiple championship runs with different teams.",
        author: "BasketballAnalyst",
        timestamp: new Date(Date.now() - 45 * 60 * 1000),
        points: 8,
        userId: 2
      },
      {
        id: 2,
        content: "Michael Jordan's perfect Finals record (6-0) and his clutch factor in elimination games sets him apart. The psychological dominance he had over opponents was unmatched.",
        author: "ClassicNBA",
        timestamp: new Date(Date.now() - 30 * 60 * 1000),
        points: 7,
        userId: 3
      },
      {
        id: 3,
        content: "Both are incredible, but LeBron's statistical dominance across all categories (scoring, rebounding, assists) makes him more complete. He's literally top 10 all-time in multiple major categories.",
        author: "StatMaster",
        timestamp: new Date(Date.now() - 15 * 60 * 1000),
        points: 6,
        userId: 4
      }
    ];

    setComments(mockComments);
  }, [id, debates, navigate]);

  const handleJoinDebate = () => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }
    joinDebate(parseInt(id));
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    
    if (!user) {
      setShowAuthModal(true);
      return;
    }

    if (!newComment.trim()) return;

    setIsSubmitting(true);

    try {
      // Get AI moderation results
      const moderation = await moderateComment(newComment, debate.topic);
      
      // Create new comment
      const comment = {
        id: Date.now(),
        content: newComment,
        author: user.username,
        timestamp: new Date(),
        points: moderation.points,
        userId: user.id
      };

      setComments(prev => [...prev, comment]);
      setNewComment('');

      // Award points to user
      updateUser({ 
        debatePoints: user.debatePoints + moderation.points 
      });

      // Show feedback if provided
      if (moderation.feedback && moderation.feedback !== "Comment evaluated successfully") {
        console.log('AI Feedback:', moderation.feedback);
      }

    } catch (error) {
      console.error('Error submitting comment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isDebateActive = debate?.status === 'active' && debate?.endTime > new Date();

  if (!debate) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div style={{ padding: '40px 0' }}>
      <div className="container">
        <button 
          onClick={() => navigate('/debates')}
          className="btn btn-secondary"
          style={{ marginBottom: '24px' }}
        >
          <ArrowLeft size={20} />
          Back to Debates
        </button>

        {/* Debate Header */}
        <div className="card" style={{ marginBottom: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
            <div style={{ flex: 1 }}>
              <h1 style={{ fontSize: '28px', marginBottom: '12px' }}>{debate.topic}</h1>
              <div style={{ display: 'flex', gap: '16px', alignItems: 'center', color: '#888' }}>
                <span style={{ 
                  color: debate.status === 'active' ? '#4ade80' : '#888',
                  fontWeight: '600'
                }}>
                  {debate.status.toUpperCase()}
                </span>
                <span>{debate.sport}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Users size={16} />
                  {debate.participants} participants
                </div>
                {isDebateActive && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Clock size={16} />
                    Ends {formatDistanceToNow(debate.endTime, { addSuffix: true })}
                  </div>
                )}
              </div>
            </div>
            
            {isDebateActive && user && (
              <button 
                onClick={handleJoinDebate}
                className="btn btn-primary"
              >
                Join Debate
              </button>
            )}
          </div>

          {!isDebateActive && (
            <div style={{ 
              padding: '16px', 
              backgroundColor: '#2a2a2a', 
              borderRadius: '8px',
              textAlign: 'center',
              color: '#888'
            }}>
              <Trophy size={20} style={{ marginRight: '8px', color: '#f59e0b' }} />
              This debate has ended
            </div>
          )}
        </div>

        {/* Comments Section */}
        <div className="card">
          <h2 style={{ marginBottom: '24px' }}>Debate Comments</h2>
          
          {/* Comment Form */}
          {isDebateActive && user && (
            <form onSubmit={handleSubmitComment} style={{ marginBottom: '32px' }}>
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Share your insight on this debate..."
                className="textarea"
                style={{ marginBottom: '16px' }}
                disabled={isSubmitting}
              />
              <button 
                type="submit"
                className="btn btn-primary"
                disabled={isSubmitting || !newComment.trim()}
              >
                {isSubmitting ? 'Processing...' : (
                  <>
                    <Send size={18} />
                    Submit Comment
                  </>
                )}
              </button>
            </form>
          )}

          {!user && isDebateActive && (
            <div style={{ 
              padding: '24px', 
              textAlign: 'center', 
              backgroundColor: '#2a2a2a', 
              borderRadius: '8px',
              marginBottom: '32px'
            }}>
              <p style={{ marginBottom: '16px' }}>Sign in to participate in this debate</p>
              <button 
                onClick={() => setShowAuthModal(true)}
                className="btn btn-primary"
              >
                Sign In
              </button>
            </div>
          )}

          {/* Comments List */}
          <div>
            {comments.map(comment => (
              <div key={comment.id} className="comment">
                <div className="comment-header">
                  <span className="comment-author">{comment.author}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ color: '#888', fontSize: '14px' }}>
                      {formatDistanceToNow(comment.timestamp, { addSuffix: true })}
                    </span>
                    <span className="comment-points">
                      +{comment.points} pts
                    </span>
                  </div>
                </div>
                <p style={{ lineHeight: '1.6' }}>{comment.content}</p>
              </div>
            ))}

            {comments.length === 0 && (
              <div style={{ textAlign: 'center', padding: '40px', color: '#888' }}>
                <p>No comments yet. Be the first to share your insights!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DebateRoom;