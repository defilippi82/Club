import React, { createContext, useState, useContext } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [navigate, setNavigate] = useState(null);

  return (
    <UserContext.Provider value={{ userData, setUserData, navigate, setNavigate }}>
      {children}
    </UserContext.Provider>
  );
};
export const useUser = () => useContext(UserContext); 
