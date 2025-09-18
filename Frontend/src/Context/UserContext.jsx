import { useState, createContext } from 'react';

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); 
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateUser = (userData) => {
    setUser(userData);
  };

  const value = {
    user,
    setUser,
    isLoading,
    setIsLoading,
    error,
    setError,
    updateUser,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
