"use client";

import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "@/firebase/config";

// 1️⃣ Create Context
const AuthContext = createContext({
  user: null,
  loading: true,
});
const googleProvider = new GoogleAuthProvider();

// 2️⃣ Provider Component
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const creatUser = () => {
    return signInWithPopup(auth, googleProvider);
  };
  const logOut = () => {
    return signOut(auth);
  };
  const creatInEmailAndPass = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const updateUser = (upDatedData) => {
    return updateProfile(auth.currentUser, upDatedData);
  };
  const logIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  useEffect(() => {
    // Listen for auth state changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    // Cleanup listener on unmount
    return () => unsubscribe();
  }, []);

  const authInfo = {
    user,
    loading,
    creatUser,
    logOut,
    creatInEmailAndPass,
    updateUser,
    logIn,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
}

// 3️⃣ Custom hook to use context
export function useAuth() {
  return useContext(AuthContext);
}
