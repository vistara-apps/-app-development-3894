import { Link } from 'react-router-dom';
import { MessageSquare, Trophy, Database, Zap, Users, TrendingUp } from 'lucide-react';

function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <h1>Elevate Your Sports Debates</h1>
          <p>
            Join the ultimate platform for sports fans to engage in AI-moderated debates, 
            earn points for quality insights, and access exclusive sports data and analytics.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
            <Link to="/debates" className="btn btn-primary">
              <MessageSquare size={20} />
              Start Debating
            </Link>
            <Link to="/premium" className="btn btn-secondary">
              <Database size={20} />
              Explore Premium
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={{ padding: '80px 0' }}>
        <div className="container">
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <MessageSquare size={32} color="white" />
              </div>
              <h3 style={{ marginBottom: '16px' }}>AI-Moderated Debates</h3>
              <p style={{ color: '#888', lineHeight: '1.6' }}>
                Engage in structured sports debates with AI moderation that promotes 
                quality discussions and flags misinformation for a better experience.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <Trophy size={32} color="white" />
              </div>
              <h3 style={{ marginBottom: '16px' }}>Earn Debate Points</h3>
              <p style={{ color: '#888', lineHeight: '1.6' }}>
                Get rewarded for your sports knowledge! Earn points for insightful 
                contributions and redeem them for exclusive content and rewards.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <Database size={32} color="white" />
              </div>
              <h3 style={{ marginBottom: '16px' }}>Exclusive Sports Data</h3>
              <p style={{ color: '#888', lineHeight: '1.6' }}>
                Access premium analytics, advanced stats, and predictive models 
                that give you an edge in understanding sports trends and outcomes.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <Zap size={32} color="white" />
              </div>
              <h3 style={{ marginBottom: '16px' }}>AI-Powered Insights</h3>
              <p style={{ color: '#888', lineHeight: '1.6' }}>
                Receive personalized, data-driven insights and predictions tailored 
                to your interests and favorite teams.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <Users size={32} color="white" />
              </div>
              <h3 style={{ marginBottom: '16px' }}>Community Driven</h3>
              <p style={{ color: '#888', lineHeight: '1.6' }}>
                Join a passionate community of sports fans who value quality 
                discussion and evidence-based arguments over hot takes.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <TrendingUp size={32} color="white" />
              </div>
              <h3 style={{ marginBottom: '16px' }}>Track Performance</h3>
              <p style={{ color: '#888', lineHeight: '1.6' }}>
                Monitor your debate performance, point accumulation, and ranking 
                within the community to showcase your sports expertise.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ padding: '80px 0', background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '36px', marginBottom: '24px' }}>
            Ready to Elevate Your Sports Knowledge?
          </h2>
          <p style={{ fontSize: '18px', color: '#888', marginBottom: '32px', maxWidth: '600px', margin: '0 auto 32px' }}>
            Join thousands of sports fans who are already earning points, 
            accessing premium data, and engaging in the best sports debates online.
          </p>
          <Link to="/debates" className="btn btn-primary" style={{ fontSize: '18px', padding: '16px 32px' }}>
            <MessageSquare size={20} />
            Join the Debate
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;