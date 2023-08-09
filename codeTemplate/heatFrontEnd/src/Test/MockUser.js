// MockAuthContext.js
import React, { createContext, useContext, useState } from 'react';

const MockAuthContext = createContext();

export function MockAuthProvider({ children }) {
  const [user, setUser] = useState({ username: 'testuser' }); // Simulate a logged-in user

  const login = () => {
    // Simulate a login action
    setUser({ username: 'testuser' });
  };

  const logout = () => {
    // Simulate a logout action
    setUser(null);
  };

  return (
    <MockAuthContext.Provider value={{ user, login, logout }}>
      {children}
    </MockAuthContext.Provider>
  );
}

export function useMockAuth() {
  return useContext(MockAuthContext);
}
