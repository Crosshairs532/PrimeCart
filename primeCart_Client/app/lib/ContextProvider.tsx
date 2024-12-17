import React, { createContext, ReactNode, useContext } from "react";

const PrimeCartContext = createContext(null);

const ContextProvider = ({ children }: { children: ReactNode }) => {
  const user = {};
  return (
    <PrimeCartContext.Provider value={user}>
      {children}
    </PrimeCartContext.Provider>
  );
};

export default ContextProvider;
