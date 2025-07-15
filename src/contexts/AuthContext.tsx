import { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  username: string;
  currency: number;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  createAccount: (username: string, password: string) => boolean;
  checkUsernameAvailability: (username: string) => boolean;
  updateCurrency: (amount: number) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const existingUsers = [
  { username: 'alan', password: 'Owner52' }
];

const createdUsers: { username: string; password: string }[] = [];

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (username: string, password: string): boolean => {
    const allUsers = [...existingUsers, ...createdUsers];
    const foundUser = allUsers.find(u => u.username === username && u.password === password);
    
    if (foundUser) {
      setUser({ username: foundUser.username, currency: 100 });
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  const createAccount = (username: string, password: string): boolean => {
    if (checkUsernameAvailability(username)) {
      createdUsers.push({ username, password });
      setUser({ username, currency: 100 });
      return true;
    }
    return false;
  };

  const checkUsernameAvailability = (username: string): boolean => {
    const allUsers = [...existingUsers, ...createdUsers];
    return !allUsers.some(u => u.username.toLowerCase() === username.toLowerCase());
  };

  const updateCurrency = (amount: number) => {
    if (user) {
      setUser({ ...user, currency: user.currency + amount });
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      createAccount,
      checkUsernameAvailability,
      updateCurrency
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