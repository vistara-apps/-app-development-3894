import { useState } from 'react';
import { Crown, Check, Zap, Database, TrendingUp, Users } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { usePaymentContext } from '../hooks/usePaymentContext';

function Premium() {
  const { user, updateUser } = useAuth();
  const { createSession } = usePaymentContext();
  const [isPurchasing, setIsPurchasing] = useState(false);

  const handleUpgrade = async () => {
    setIsPurchasing(true);
    try {
      await createSession("$10");
      updateUser({ isPremium: true });
      alert('Welcome to Premium! Your account has been upgraded.');
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment failed. Please try again.');
    } finally {
      setIsPurchasing(false);
    }
  };

  const premiumFeatures = [
    {
      icon: Database,
      title: 'Exclusive Sports Data',
      description: 'Access comprehensive analytics, advanced stats, and predictive models not available anywhere else.'
    },
    {
      icon: Zap,
      title: 'AI-Powered Insights',
      description: 'Get personalized predictions and analysis tailored to your favorite teams and interests.'
    },
    {
      icon: TrendingUp,
      title: 'Advanced Analytics',
      description: 'Deep dive into performance metrics, trend analysis, and statistical projections.'
    },
    {
      icon: Users,
      title: 'Premium Community',
      description: 'Access to exclusive debates and discussions with our most knowledgeable members.'
    }
  ];

  const comparisons = [
    { feature: 'Basic Debates', free: true, premium: true },
    { feature: 'Earn Debate Points', free: true, premium: true },
    { feature: 'Basic Sports Data', free: true, premium: true },
    { feature: 'Exclusive Premium Data', free: false, premium: true },
    { feature: 'AI-Powered Insights', free: false, premium: true },
    { feature: 'Advanced Analytics', free: false, premium: true },
    { feature: 'Premium Community Access', free: false, premium: true },
    { feature: 'Priority Support', free: false, premium: true }
  ];

  return (
    <div style={{ padding: '40px 0' }}>
      <div className="container">
        {/* Hero Section */}
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <div style={{ 
            width: '80px', 
            height: '80px', 
            margin: '0 auto 24px',
            background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            borderRadius: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Crown size={40} color="white" />
          </div>
          <h1 style={{ fontSize: '48px', marginBottom: '24px' }}>
            Unlock Premium Sports Intelligence
          </h1>
          <p style={{ fontSize: '20px', color: '#888', maxWidth: '600px', margin: '0 auto 32px' }}>
            Get access to exclusive data, AI-powered insights, and advanced analytics 
            that will elevate your sports knowledge to the next level.
          </p>

          {user?.isPremium ? (
            <div style={{ 
              padding: '24px',
              backgroundColor: '#1a4d3a',
              borderRadius: '12px',
              border: '2px solid #4ade80',
              maxWidth: '400px',
              margin: '0 auto'
            }}>
              <Crown size={32} style={{ color: '#4ade80', marginBottom: '16px' }} />
              <h3 style={{ color: '#4ade80', marginBottom: '8px' }}>Premium Active</h3>
              <p style={{ color: '#888' }}>You have full access to all premium features</p>
            </div>
          ) : (
            <div style={{ 
              padding: '32px',
              background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
              borderRadius: '16px',
              border: '2px solid #667eea',
              maxWidth: '400px',
              margin: '0 auto'
            }}>
              <h3 style={{ fontSize: '36px', marginBottom: '8px' }}>$10</h3>
              <p style={{ color: '#888', marginBottom: '24px' }}>per month</p>
              <button 
                onClick={handleUpgrade}
                disabled={isPurchasing}
                className="btn btn-primary"
                style={{ width: '100%', fontSize: '18px', padding: '16px' }}
              >
                {isPurchasing ? 'Processing...' : 'Upgrade to Premium'}
              </button>
            </div>
          )}
        </div>

        {/* Features Grid */}
        <div style={{ marginBottom: '80px' }}>
          <h2 style={{ textAlign: 'center', fontSize: '32px', marginBottom: '48px' }}>
            Premium Features
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
            {premiumFeatures.map((feature, index) => (
              <div key={index} className="card" style={{ textAlign: 'center' }}>
                <div style={{
                  width: '64px',
                  height: '64px',
                  margin: '0 auto 24px',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <feature.icon size={32} color="white" />
                </div>
                <h3 style={{ marginBottom: '16px' }}>{feature.title}</h3>
                <p style={{ color: '#888', lineHeight: '1.6' }}>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Comparison Table */}
        <div className="card">
          <h2 style={{ textAlign: 'center', marginBottom: '32px' }}>Free vs Premium</h2>
          <div style={{ overflow: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #333' }}>
                  <th style={{ textAlign: 'left', padding: '16px', color: '#888' }}>Feature</th>
                  <th style={{ textAlign: 'center', padding: '16px', color: '#888' }}>Free</th>
                  <th style={{ textAlign: 'center', padding: '16px', color: '#888' }}>Premium</th>
                </tr>
              </thead>
              <tbody>
                {comparisons.map((row, index) => (
                  <tr key={index} style={{ borderBottom: '1px solid #333' }}>
                    <td style={{ padding: '16px', fontWeight: '500' }}>{row.feature}</td>
                    <td style={{ textAlign: 'center', padding: '16px' }}>
                      {row.free ? (
                        <Check size={20} color="#4ade80" />
                      ) : (
                        <span style={{ color: '#888' }}>—</span>
                      )}
                    </td>
                    <td style={{ textAlign: 'center', padding: '16px' }}>
                      {row.premium ? (
                        <Check size={20} color="#4ade80" />
                      ) : (
                        <span style={{ color: '#888' }}>—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Premium;