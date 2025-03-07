
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import HeroSection from '@/components/home/HeroSection';
import FeatureCard from '@/components/home/FeatureCard';
import { Shield, Zap, Award, Code, Lock, Clock } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';

const Index = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <Layout>
      <HeroSection />
      
      {/* Features Section */}
      <section className="py-20 container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Powerful Features</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our exploit offers a comprehensive suite of features designed to enhance your Roblox experience.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            title="Undetectable"
            description="Our exploit uses advanced techniques to stay under the radar and avoid detection by anti-cheat systems."
            icon={<Shield className="h-6 w-6" />}
          />
          <FeatureCard
            title="High Performance"
            description="Optimized for speed and efficiency, our exploit won't slow down your gameplay."
            icon={<Zap className="h-6 w-6" />}
          />
          <FeatureCard
            title="Premium Scripts"
            description="Access a library of premium scripts designed exclusively for our members."
            icon={<Award className="h-6 w-6" />}
          />
          <FeatureCard
            title="Script Executor"
            description="Execute any Lua script with our powerful and reliable executor."
            icon={<Code className="h-6 w-6" />}
          />
          <FeatureCard
            title="Secure & Safe"
            description="Your account security is our priority. Our exploit is designed to keep your Roblox account safe."
            icon={<Lock className="h-6 w-6" />}
          />
          <FeatureCard
            title="Regular Updates"
            description="We provide regular updates to ensure compatibility with the latest Roblox versions."
            icon={<Clock className="h-6 w-6" />}
          />
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-exploit-primary/10 via-exploit-secondary/10 to-exploit-accent/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Gameplay?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied users who have elevated their Roblox experience with our exploit.
          </p>
          
          {user ? (
            <Button 
              className="exploit-button text-lg px-8 py-6"
              onClick={() => navigate('/dashboard')}
            >
              Access Dashboard
            </Button>
          ) : (
            <Button 
              className="exploit-button text-lg px-8 py-6"
              onClick={() => navigate('/register')}
            >
              Get Started Now
            </Button>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Index;
