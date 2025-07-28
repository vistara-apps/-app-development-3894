import { useState } from 'react';
import { Download, Lock, TrendingUp, BarChart3, Target } from 'lucide-react';
import { useData } from '../contexts/DataContext';
import { useAuth } from '../contexts/AuthContext';
import { usePaymentContext } from '../hooks/usePaymentContext';

function ExclusiveData() {
  const { exclusiveData } = useData();
  const { user, setShowAuthModal } = useAuth();
  const { createSession } = usePaymentContext();
  const [purchasingItem, setPurchasingItem] = useState(null);

  const handlePurchase = async (item) => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }

    if (!user.isPremium) {
      alert('Premium membership required to purchase exclusive data');
      return;
    }

    setPurchasingItem(item.id);
    try {
      await createSession(item.price);
      alert(`Successfully purchased: ${item.title}`);
    } catch (error) {
      console.error('Purchase error:', error);
      alert('Purchase failed. Please try again.');
    } finally {
      setPurchasingItem(null);
    }
  };

  const getIcon = (type) => {
    switch (type) {
      case 'analytics': return BarChart3;
      case 'predictions': return Target;
      default: return TrendingUp;
    }
  };

  return (
    <div style={{ padding: '40px 0' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h1 style={{ fontSize: '36px', marginBottom: '16px' }}>Exclusive Sports Data</h1>
          <p style={{ color: '#888', fontSize: '18px', maxWidth: '600px', margin: '0 auto' }}>
            Access premium sports analytics, predictive models, and insights not available anywhere else.
            Premium membership required for purchases.
          </p>
        </div>

        {!user?.isPremium && (
          <div className="card" style={{ 
            textAlign: 'center', 
            marginBottom: '40px',
            border: '2px solid #667eea',
            background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))'
          }}>
            <Lock size={48} style={{ color: '#667eea', marginBottom: '16px' }} />
            <h3 style={{ marginBottom: '16px' }}>Premium Access Required</h3>
            <p style={{ color: '#888', marginBottom: '24px' }}>
              Upgrade to Premium to purchase and access exclusive sports data and analytics
            </p>
            <button 
              onClick={() => window.location.href = '/premium'}
              className="btn btn-primary"
            >
              Upgrade to Premium
            </button>
          </div>
        )}

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
          gap: '32px' 
        }}>
          {exclusiveData.map(item => {
            const Icon = getIcon(item.type);
            return (
              <div key={item.id} className="card">
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '16px', 
                  marginBottom: '16px' 
                }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Icon size={24} color="white" />
                  </div>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ marginBottom: '4px' }}>{item.title}</h3>
                    <span className="premium-badge">{item.type}</span>
                  </div>
                </div>

                <p style={{ color: '#888', lineHeight: '1.6', marginBottom: '20px' }}>
                  {item.description}
                </p>

                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  paddingTop: '20px',
                  borderTop: '1px solid #333'
                }}>
                  <div>
                    <div style={{ fontSize: '24px', fontWeight: '700', marginBottom: '4px' }}>
                      {item.price}
                    </div>
                    <div style={{ color: '#888', fontSize: '14px' }}>
                      <Download size={14} style={{ marginRight: '4px' }} />
                      {item.downloadCount} downloads
                    </div>
                  </div>

                  <button
                    onClick={() => handlePurchase(item)}
                    disabled={!user?.isPremium || purchasingItem === item.id}
                    className={user?.isPremium ? "btn btn-primary" : "btn btn-secondary"}
                  >
                    {purchasingItem === item.id ? (
                      'Processing...'
                    ) : user?.isPremium ? (
                      <>
                        <Download size={18} />
                        Purchase
                      </>
                    ) : (
                      <>
                        <Lock size={18} />
                        Premium Only
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {exclusiveData.length === 0 && (
          <div style={{ textAlign: 'center', padding: '80px 0' }}>
            <h3 style={{ color: '#888', marginBottom: '16px' }}>No exclusive data available</h3>
            <p style={{ color: '#666' }}>Check back soon for new premium content!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ExclusiveData;