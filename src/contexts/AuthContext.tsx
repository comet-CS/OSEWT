
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from "@/hooks/use-toast";
import { encrypt, decrypt } from "@/lib/encryption";

// Define the shape of a user
export interface User {
  username: string;
  email: string;
}

// Define the auth context shape
interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  register: (username: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => false,
  register: async () => false,
  logout: () => {},
  isLoading: true,
});

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);

// Provider component that wraps parts of the app that need the auth context
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // On mount, check if user is already logged in
  useEffect(() => {
    const checkLoggedIn = () => {
      try {
        const storedUser = localStorage.getItem('exploit_user');
        if (storedUser) {
          const decryptedUser = decrypt(storedUser);
          setUser(JSON.parse(decryptedUser));
        }
      } catch (error) {
        console.error('Failed to restore user session:', error);
        // Invalid stored data, clean it up
        localStorage.removeItem('exploit_user');
        localStorage.removeItem('exploit_credentials');
      } finally {
        setIsLoading(false);
      }
    };

    checkLoggedIn();
  }, []);

  // Register a new user
  const register = async (username: string, email: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      
      // Check if user already exists
      const storedCredentials = localStorage.getItem('exploit_credentials');
      const credentials = storedCredentials 
        ? JSON.parse(decrypt(storedCredentials)) 
        : [];
      
      const userExists = credentials.some(
        (cred: any) => cred.username === username || cred.email === email
      );
      
      if (userExists) {
        toast({
          title: "Registration failed",
          description: "Username or email already exists",
          variant: "destructive"
        });
        return false;
      }
      
      // Add new user to credentials
      const newUser = { username, email, password };
      credentials.push(newUser);
      
      // Encrypt and store credentials
      localStorage.setItem('exploit_credentials', encrypt(JSON.stringify(credentials)));
      
      // Set the current user (without password)
      const currentUser = { username, email };
      localStorage.setItem('exploit_user', encrypt(JSON.stringify(currentUser)));
      setUser(currentUser);
      
      toast({
        title: "Registration successful",
        description: "Welcome to Exploit Pro",
      });
      
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      toast({
        title: "Registration failed",
        description: "An unexpected error occurred",
        variant: "destructive"
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Login an existing user
  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      
      // Get stored credentials
      const storedCredentials = localStorage.getItem('exploit_credentials');
      if (!storedCredentials) {
        toast({
          title: "Login failed",
          description: "Invalid username or password",
          variant: "destructive"
        });
        return false;
      }
      
      const credentials = JSON.parse(decrypt(storedCredentials));
      
      // Find matching user
      const foundUser = credentials.find(
        (cred: any) => 
          (cred.username === username || cred.email === username) && 
          cred.password === password
      );
      
      if (!foundUser) {
        toast({
          title: "Login failed",
          description: "Invalid username or password",
          variant: "destructive"
        });
        return false;
      }
      
      // Set the current user (without password)
      const currentUser = { 
        username: foundUser.username, 
        email: foundUser.email 
      };
      
      localStorage.setItem('exploit_user', encrypt(JSON.stringify(currentUser)));
      setUser(currentUser);
      
      toast({
        title: "Login successful",
        description: `Welcome back, ${foundUser.username}!`,
      });
      
      return true;
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "Login failed",
        description: "An unexpected error occurred",
        variant: "destructive"
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout the current user
  const logout = () => {
    localStorage.removeItem('exploit_user');
    setUser(null);
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
  };

  // Provide the auth context to children components
  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
