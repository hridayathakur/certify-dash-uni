import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '@/types';

interface AuthContextType {
  user: User | null;
  login: (credentials: { id: string; password: string; role: string }) => boolean;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Demo users for hackathon
const DEMO_USERS: Record<string, User> = {
  'STU123': {
    id: 'STU123',
    role: 'student',
    name: 'John Doe',
    email: 'john.doe@university.edu'
  },
  'FAC001': {
    id: 'FAC001',
    role: 'faculty',
    name: 'Dr. Sarah Wilson',
    email: 'sarah.wilson@university.edu'
  },
  'ORG001': {
    id: 'ORG001',
    role: 'organizer',
    name: 'Alex Johnson',
    email: 'alex.johnson@university.edu'
  }
};

const DEMO_PASSWORDS: Record<string, string> = {
  'STU123': 'student123',
  'FAC001': 'faculty123',
  'ORG001': 'organizer123'
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = (credentials: { id: string; password: string; role: string }): boolean => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const demoUser = DEMO_USERS[credentials.id];
      const expectedPassword = DEMO_PASSWORDS[credentials.id];
      
      if (demoUser && 
          expectedPassword === credentials.password && 
          demoUser.role === credentials.role) {
        setUser(demoUser);
        setIsLoading(false);
        return true;
      }
      
      setIsLoading(false);
    }, 1000);

    const demoUser = DEMO_USERS[credentials.id];
    const expectedPassword = DEMO_PASSWORDS[credentials.id];
    
    return !!(demoUser && 
             expectedPassword === credentials.password && 
             demoUser.role === credentials.role);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}