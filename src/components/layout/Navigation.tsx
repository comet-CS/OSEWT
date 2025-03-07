
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { LogOut, User } from 'lucide-react';

const Navigation = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="py-4 border-b border-border/40 backdrop-blur-sm bg-background/80 fixed top-0 left-0 right-0 z-10">
      <div className="container flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span 
            className="font-bold text-xl cursor-pointer exploit-gradient-text"
            onClick={() => navigate('/')}
          >
            ExploitPro
          </span>
        </div>
        
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4 text-exploit-accent" />
                <span className="text-sm">{user.username}</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="text-muted-foreground hover:text-white"
              >
                <LogOut className="h-4 w-4 mr-1" />
                Logout
              </Button>
            </>
          ) : (
            <div className="flex items-center space-x-2">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate('/login')}
                className="hover:bg-exploit-primary/20 text-white"
              >
                Login
              </Button>
              <Button
                onClick={() => navigate('/register')}
                size="sm"
                className="exploit-button"
              >
                Register
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
