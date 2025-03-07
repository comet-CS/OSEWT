
import { useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Skeleton } from '@/components/ui/skeleton';

const ProtectedRoute = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !user) {
      // Check both localStorage and sessionStorage for user data
      const localStorageUser = localStorage.getItem('exploit_user');
      const sessionStorageUser = sessionStorage.getItem('exploit_user');
      
      if (!localStorageUser && !sessionStorageUser) {
        navigate('/login');
      }
    }
  }, [user, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-full max-w-md space-y-4 animate-pulse">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-12 w-full" />
        </div>
      </div>
    );
  }

  return user ? <Outlet /> : null;
};

export default ProtectedRoute;
