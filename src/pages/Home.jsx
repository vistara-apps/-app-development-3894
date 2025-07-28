import { Link } from 'react-router-dom';
import { MessageSquare, Trophy, Database, Zap, Users, TrendingUp } from 'lucide-react';

function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="hero animate-fade-in">
        <div className="container">
          <h1 className="hero-title">Elevate Your Sports Debates</h1>
          <p className="hero-subtitle">
            Join the ultimate platform for sports fans to engage in AI-moderated debates, 
            earn points for quality insights, and access exclusive sports data and analytics.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/debates" className="btn btn-primary btn-lg hover-lift">
              <MessageSquare size={20} />
              Start Debating
            </Link>
            <Link to="/premium" className="btn btn-secondary btn-lg hover-lift">
              <Database size={20} />
              Explore Premium
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-spacing">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="section-title">Powerful Features for Sports Fans</h2>
            <p className="section-subtitle">
              Everything you need to elevate your sports knowledge and engage in meaningful debates
            </p>
          </div>
          
          <div className="features-grid stagger-children">
            <div className="feature-card hover-lift">
              <div className="feature-icon">
                <MessageSquare size={32} color="white" />
              </div>
              <h3 className="heading-5 mb-4">AI-Moderated Debates</h3>
              <p className="text-secondary">
                Engage in structured sports debates with AI moderation that promotes 
                quality discussions and flags misinformation for a better experience.
              </p>
            </div>

            <div className="feature-card hover-lift">
              <div className="feature-icon">
                <Trophy size={32} color="white" />
              </div>
              <h3 className="heading-5 mb-4">Earn Debate Points</h3>
              <p className="text-secondary">
                Get rewarded for your sports knowledge! Earn points for insightful 
                contributions and redeem them for exclusive content and rewards.
              </p>
            </div>

            <div className="feature-card hover-lift">
              <div className="feature-icon">
                <Database size={32} color="white" />
              </div>
              <h3 className="heading-5 mb-4">Exclusive Sports Data</h3>
              <p className="text-secondary">
                Access premium analytics, advanced stats, and predictive models 
                that give you an edge in understanding sports trends and outcomes.
              </p>
            </div>

            <div className="feature-card hover-lift">
              <div className="feature-icon">
                <Zap size={32} color="white" />
              </div>
              <h3 className="heading-5 mb-4">AI-Powered Insights</h3>
              <p className="text-secondary">
                Receive personalized, data-driven insights and predictions tailored 
                to your interests and favorite teams.
              </p>
            </div>

            <div className="feature-card hover-lift">
              <div className="feature-icon">
                <Users size={32} color="white" />
              </div>
              <h3 className="heading-5 mb-4">Community Driven</h3>
              <p className="text-secondary">
                Join a passionate community of sports fans who value quality 
                discussion and evidence-based arguments over hot takes.
              </p>
            </div>

            <div className="feature-card hover-lift">
              <div className="feature-icon">
                <TrendingUp size={32} color="white" />
              </div>
              <h3 className="heading-5 mb-4">Track Performance</h3>
              <p className="text-secondary">
                Monitor your debate performance, point accumulation, and ranking 
                within the community to showcase your sports expertise.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-spacing bg-gradient-to-r from-primary-500/10 to-secondary-500/10">
        <div className="container text-center">
          <h2 className="heading-2 mb-6 animate-fade-in">
            Ready to Elevate Your Sports Knowledge?
          </h2>
          <p className="text-lg text-secondary mb-8 max-w-2xl mx-auto animate-fade-in">
            Join thousands of sports fans who are already earning points, 
            accessing premium data, and engaging in the best sports debates online.
          </p>
          <Link 
            to="/debates" 
            className="btn btn-primary btn-lg hover-lift hover-glow animate-bounce"
          >
            <MessageSquare size={20} />
            Join the Debate
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;
