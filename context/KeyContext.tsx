import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { onSnapshot, doc, updateDoc, increment } from 'firebase/firestore';
import { db } from '../app/firebaseConfig';

const DUMMY_USER_ID = "test_user_001";

interface KeyContextData {
  keyBalance: number;
  addKeys: (amt: number) => Promise<void>;
  subtractKeys: (amt: number) => Promise<void>;
}

interface KeyProviderProps {
  children: ReactNode;
}

const KeyContext = createContext<KeyContextData>({} as KeyContextData);

export function KeyProvider({ children }: KeyProviderProps) {
  const [keyBalance, setKeyBalance] = useState<number>(0);

  useEffect(() => {
    const userRef = doc(db, 'users', DUMMY_USER_ID);
    const unsub = onSnapshot(userRef, snap => {
      setKeyBalance(snap.data()?.keys ?? 0);
    });
    return () => unsub();
  }, []);

  const addKeys = async (amt: number) => {
    const userRef = doc(db, 'users', DUMMY_USER_ID);
    await updateDoc(userRef, { keys: increment(amt) });
  };

  const subtractKeys = async (amt: number) => {
    const userRef = doc(db, 'users', DUMMY_USER_ID);
    await updateDoc(userRef, { keys: increment(-amt) });
  };

  return (
    <KeyContext.Provider value={{ keyBalance, addKeys, subtractKeys }}>
      {children}
    </KeyContext.Provider>
  );
}

export const useKey = () => useContext(KeyContext);
