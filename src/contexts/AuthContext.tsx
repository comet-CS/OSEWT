
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from "@/hooks/use-toast";
import { encrypt, decrypt } from "@/lib/encryption";
import { useNavigate } from 'react-router-dom';

// Define the shape of a user
export interface User {
  username: string;
  email: string;
}

// Define the shape of script data
export interface Script {
  id: string;
  name: string;
  game: string;
  content: string;
  description: string;
  isFavorite: boolean;
}

// Define the auth context shape
interface AuthContextType {
  user: User | null;
  login: (username: string, password: string, rememberMe: boolean) => Promise<boolean>;
  register: (username: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
  scripts: Script[];
  addScript: (script: Omit<Script, 'id'>) => void;
  toggleFavorite: (id: string) => void;
  getScript: (id: string) => Script | undefined;
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => false,
  register: async () => false,
  logout: () => {},
  isLoading: true,
  scripts: [],
  addScript: () => {},
  toggleFavorite: () => {},
  getScript: () => undefined,
});

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);

// Sample script data
const defaultScripts: Script[] = [
  {
    id: '1',
    name: 'Auto Farm',
    game: 'Adopt Me',
    content: 'local OrionLib = loadstring(game:HttpGet(("https://raw.githubusercontent.com/shlexware/Orion/main/source")))()\nlocal Window = OrionLib:MakeWindow({Name = "Auto Farm", HidePremium = false})\n\nlocal Tab = Window:MakeTab({\n\tName = "Main",\n\tIcon = "rbxassetid://4483345998"\n})\n\nTab:AddToggle({\n\tName = "Auto Farm",\n\tDefault = false,\n\tCallback = function(Value)\n\t\t_G.autoFarm = Value\n\t\twhile _G.autoFarm do\n\t\t\t-- Farm code here\n\t\t\twait(1)\n\t\tend\n\tend\n})',
    description: 'Automatically farms resources in Adopt Me',
    isFavorite: false
  },
  {
    id: '2',
    name: 'Infinite Cash',
    game: 'Blox Fruits',
    content: 'local Players = game:GetService("Players")\nlocal LocalPlayer = Players.LocalPlayer\n\nLocalPlayer.Cash.Value = 999999',
    description: 'Gives infinite cash in Blox Fruits',
    isFavorite: true
  },
  {
    id: '3',
    name: 'Auto Rob',
    game: 'Jailbreak',
    content: 'local function autoRob()\n\twhile true do\n\t\t-- Auto rob code\n\t\twait(5)\n\tend\nend\n\nspawn(autoRob)',
    description: 'Automatically robs all stores in Jailbreak',
    isFavorite: false
  },
  {
    id: '4',
    name: 'Aimbot',
    game: 'Phantom Forces',
    content: 'local Players = game:GetService("Players")\nlocal RunService = game:GetService("RunService")\nlocal UserInputService = game:GetService("UserInputService")\n\nlocal function getClosestPlayer()\n\t-- Aimbot logic\nend\n\nRunService.RenderStepped:Connect(function()\n\tif UserInputService:IsMouseButtonPressed(Enum.UserInputType.MouseButton2) then\n\t\t-- Aim at closest player\n\tend\nend)',
    description: 'Advanced aimbot for Phantom Forces',
    isFavorite: false
  },
  {
    id: '5',
    name: 'ESP Hack',
    game: 'Arsenal',
    content: 'local Players = game:GetService("Players")\nlocal RunService = game:GetService("RunService")\n\nlocal function createESP(player)\n\t-- ESP creation logic\nend\n\nfor _, player in pairs(Players:GetPlayers()) do\n\tif player ~= Players.LocalPlayer then\n\t\tcreateESP(player)\n\tend\nend\n\nPlayers.PlayerAdded:Connect(function(player)\n\tcreateESP(player)\nend)',
    description: 'See players through walls in Arsenal',
    isFavorite: true
  }
];

// Provider component that wraps parts of the app that need the auth context
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [scripts, setScripts] = useState<Script[]>([]);

  // On mount, check if user is already logged in
  useEffect(() => {
    const checkLoggedIn = () => {
      try {
        const storedUser = localStorage.getItem('exploit_user');
        const storedScripts = localStorage.getItem('exploit_scripts');
        
        if (storedUser) {
          const decryptedUser = decrypt(storedUser);
          setUser(JSON.parse(decryptedUser));
        }
        
        if (storedScripts) {
          const decryptedScripts = decrypt(storedScripts);
          setScripts(JSON.parse(decryptedScripts));
        } else {
          // Initialize with default scripts if none exist
          setScripts(defaultScripts);
          localStorage.setItem('exploit_scripts', encrypt(JSON.stringify(defaultScripts)));
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

  // Add a new script
  const addScript = (scriptData: Omit<Script, 'id'>) => {
    const newScript: Script = {
      ...scriptData,
      id: Date.now().toString(), // Simple unique ID
    };
    
    const updatedScripts = [...scripts, newScript];
    setScripts(updatedScripts);
    localStorage.setItem('exploit_scripts', encrypt(JSON.stringify(updatedScripts)));
    
    toast({
      title: "Script Added",
      description: `"${scriptData.name}" has been added to your scripts`,
    });
  };

  // Toggle favorite status of a script
  const toggleFavorite = (id: string) => {
    const updatedScripts = scripts.map(script => 
      script.id === id ? { ...script, isFavorite: !script.isFavorite } : script
    );
    
    setScripts(updatedScripts);
    localStorage.setItem('exploit_scripts', encrypt(JSON.stringify(updatedScripts)));
  };

  // Get a script by ID
  const getScript = (id: string) => {
    return scripts.find(script => script.id === id);
  };

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
  const login = async (username: string, password: string, rememberMe: boolean = false): Promise<boolean> => {
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
      
      // If remember me is checked, store in localStorage otherwise in sessionStorage
      if (rememberMe) {
        localStorage.setItem('exploit_user', encrypt(JSON.stringify(currentUser)));
      } else {
        sessionStorage.setItem('exploit_user', encrypt(JSON.stringify(currentUser)));
      }
      
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
    sessionStorage.removeItem('exploit_user');
    setUser(null);
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
  };

  // Provide the auth context to children components
  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      register, 
      logout, 
      isLoading,
      scripts,
      addScript,
      toggleFavorite,
      getScript
    }}>
      {children}
    </AuthContext.Provider>
  );
};
