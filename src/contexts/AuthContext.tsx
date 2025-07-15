import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Game {
  id: string;
  name: string;
  description: string;
  creator: string;
  badges: Badge[];
  createdAt: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
}

interface User {
  username: string;
  currency: number;
  ownedItems: string[];
  isAdmin?: boolean;
}

interface StoredUser extends User {
  password: string;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  createAccount: (username: string, password: string) => boolean;
  checkUsernameAvailability: (username: string) => boolean;
  updateCurrency: (amount: number) => void;
  deleteAccount: () => void;
  publishGame: (game: Omit<Game, 'id' | 'creator' | 'createdAt'>) => void;
  updateGame: (gameId: string, updates: Partial<Game>) => void;
  deleteGame: (gameId: string) => void;
  getPublishedGames: () => Game[];
  getAllGames: () => Game[];
  getGameById: (id: string) => Game | undefined;
  purchaseItem: (itemId: string) => void;
  giveUserCurrency: (username: string, amount: number) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const defaultUsers = [
  { username: 'alan', password: 'Owner52', currency: 100, ownedItems: [] },
  { username: 'Admin', password: 'Admin', currency: 999999999, ownedItems: [], isAdmin: true }
];

// Storage keys
const USERS_KEY = 'gaming_platform_users';
const GAMES_KEY = 'gaming_platform_games';
const CURRENT_USER_KEY = 'gaming_platform_current_user';

// Helper functions for localStorage
const loadUsers = (): StoredUser[] => {
  const stored = localStorage.getItem(USERS_KEY);
  if (stored) {
    return JSON.parse(stored);
  }
  localStorage.setItem(USERS_KEY, JSON.stringify(defaultUsers));
  return defaultUsers;
};

const saveUsers = (users: StoredUser[]) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

const loadGames = (): Game[] => {
  const stored = localStorage.getItem(GAMES_KEY);
  return stored ? JSON.parse(stored) : [{
    id: '1',
    name: 'Test Site 1',
    description: 'A test game for the platform',
    creator: 'System',
    badges: [
      { id: '1', name: 'First Steps', description: 'Complete the tutorial', icon: '🎯' },
      { id: '2', name: 'Explorer', description: 'Visit 10 different areas', icon: '🗺️' }
    ],
    createdAt: new Date().toISOString()
  }];
};

const saveGames = (games: Game[]) => {
  localStorage.setItem(GAMES_KEY, JSON.stringify(games));
};

const loadCurrentUser = (): User | null => {
  const stored = localStorage.getItem(CURRENT_USER_KEY);
  return stored ? JSON.parse(stored) : null;
};

const saveCurrentUser = (user: User | null) => {
  if (user) {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(CURRENT_USER_KEY);
  }
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<StoredUser[]>([]);
  const [games, setGames] = useState<Game[]>([]);

  // Load data on mount
  useEffect(() => {
    const storedUsers = loadUsers();
    const storedGames = loadGames();
    const currentUser = loadCurrentUser();
    
    setUsers(storedUsers);
    setGames(storedGames);
    setUser(currentUser);
  }, []);

  // Save current user when it changes
  useEffect(() => {
    saveCurrentUser(user);
    if (user) {
      // Update user in users array
      const updatedUsers = users.map(u => 
        u.username === user.username ? { ...u, ...user } : u
      );
      setUsers(updatedUsers);
      saveUsers(updatedUsers);
    }
  }, [user]);

  const login = (username: string, password: string): boolean => {
    const foundUser = users.find(u => u.username === username && u.password === password);
    
    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  const createAccount = (username: string, password: string): boolean => {
    if (checkUsernameAvailability(username)) {
      const newStoredUser: StoredUser = { 
        username, 
        password, 
        currency: 100, 
        ownedItems: [] 
      };
      const updatedUsers = [...users, newStoredUser];
      setUsers(updatedUsers);
      saveUsers(updatedUsers);
      
      const { password: _, ...userWithoutPassword } = newStoredUser;
      setUser(userWithoutPassword);
      return true;
    }
    return false;
  };

  const deleteAccount = () => {
    if (!user) return;
    
    const updatedUsers = users.filter(u => u.username !== user.username);
    setUsers(updatedUsers);
    saveUsers(updatedUsers);
    setUser(null);
  };

  const checkUsernameAvailability = (username: string): boolean => {
    return !users.some(u => u.username.toLowerCase() === username.toLowerCase());
  };

  const updateCurrency = (amount: number) => {
    if (user) {
      setUser({ ...user, currency: user.currency + amount });
    }
  };

  const purchaseItem = (itemId: string) => {
    if (user && !user.ownedItems.includes(itemId)) {
      setUser({ ...user, ownedItems: [...user.ownedItems, itemId] });
    }
  };

  const publishGame = (gameData: Omit<Game, 'id' | 'creator' | 'createdAt'>) => {
    if (!user) return;
    
    const newGame: Game = {
      ...gameData,
      id: Date.now().toString(),
      creator: user.username,
      createdAt: new Date().toISOString()
    };
    
    const updatedGames = [...games, newGame];
    setGames(updatedGames);
    saveGames(updatedGames);
  };

  const updateGame = (gameId: string, updates: Partial<Game>) => {
    const updatedGames = games.map(game => 
      game.id === gameId ? { ...game, ...updates } : game
    );
    setGames(updatedGames);
    saveGames(updatedGames);
  };

  const deleteGame = (gameId: string) => {
    const updatedGames = games.filter(game => game.id !== gameId);
    setGames(updatedGames);
    saveGames(updatedGames);
  };

  const getPublishedGames = (): Game[] => {
    if (!user) return [];
    return games.filter(game => game.creator === user.username);
  };

  const getAllGames = (): Game[] => {
    return games;
  };

  const getGameById = (id: string): Game | undefined => {
    return games.find(game => game.id === id);
  };

  const giveUserCurrency = (username: string, amount: number): boolean => {
    if (!user?.isAdmin) return false;
    
    const targetUser = users.find(u => u.username === username);
    if (!targetUser) return false;
    
    const updatedUsers = users.map(u => 
      u.username === username ? { ...u, currency: u.currency + amount } : u
    );
    setUsers(updatedUsers);
    saveUsers(updatedUsers);
    
    // Update current user if it's the target
    if (user.username === username) {
      setUser({ ...user, currency: user.currency + amount });
    }
    
    return true;
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      createAccount,
      deleteAccount,
      checkUsernameAvailability,
      updateCurrency,
      purchaseItem,
      publishGame,
      updateGame,
      deleteGame,
      getPublishedGames,
      getAllGames,
      getGameById,
      giveUserCurrency
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};