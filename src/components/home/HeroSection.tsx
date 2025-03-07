
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

const HeroSection = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background gradient effects */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-exploit-primary/20 rounded-full filter blur-3xl opacity-30" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-exploit-secondary/20 rounded-full filter blur-3xl opacity-30" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 exploit-gradient-text">
            Ultimate Roblox Exploit
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8">
            Take your gaming experience to the next level with the most powerful and reliable Roblox exploit tool.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {user ? (
              <Button 
                className="exploit-button text-lg px-8 py-6"
                onClick={() => navigate('/dashboard')}
              >
                Go to Dashboard
              </Button>
            ) : (
              <>
                <Button 
                  className="exploit-button text-lg px-8 py-6"
                  onClick={() => navigate('/register')}
                >
                  Get Started
                </Button>
                <Button 
                  variant="outline" 
                  className="border-exploit-primary/30 hover:bg-exploit-primary/10 text-lg px-8 py-6"
                  onClick={() => navigate('/login')}
                >
                  Already a Member
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
