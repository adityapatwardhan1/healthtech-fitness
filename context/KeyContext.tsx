import React, { createContext, useContext, useState, ReactNode } from 'react';

type KeyContextType = {
  keyBalance: number;
  setKeyBalance: (balance: number) => void;
  addKeys: (amount: number) => void;
  subtractKeys: (amount: number) => void;
};

const KeyContext = createContext<KeyContextType | undefined>(undefined);

type KeyProviderProps = {
  children: ReactNode;
};

export const KeyProvider = ({ children }: KeyProviderProps) => {
  const [keyBalance, setKeyBalance] = useState(100);

  const addKeys = (amount: number) => {
    setKeyBalance((prev) => prev + amount)
  }

  const subtractKeys = (amount: number) => {
    setKeyBalance((prev) => prev = Math.max(0, prev - amount))
  }


  return (
    <KeyContext.Provider value={{ keyBalance, setKeyBalance, addKeys, subtractKeys }}>
      {children}
    </KeyContext.Provider>
  );
};

export const useKey = () => {
  const context = useContext(KeyContext);
  if (!context) throw new Error("useKey must be used within a KeyProvider");
  return context;
};

{/*HOW TO USE
    import { useKey } from '../../context/KeyContext'; // at top

    const { keyBalance, addKeys, subtractKeys } = useKey(); //add in page function, before return

    Sample of how you can use the keys (place inside of<View> container):
          <Text>Your Balance: {keyBalance} keys</Text>
    
          <TouchableOpacity onPress={() => addKeys(5)}>
            <Text>Add 5 Keys</Text>
          </TouchableOpacity>
    
          <TouchableOpacity onPress={() => subtractKeys(2)}>
            <Text>Use 2 Keys</Text>
          </TouchableOpacity>

    
    */}
