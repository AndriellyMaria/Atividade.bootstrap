// src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import {
  auth,
  googleProvider,
  microsoftProvider,
} from "../firebase";
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

const loginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    console.log("Google user:", result.user);
  } catch (error) {
    console.error("Erro login Google:", error);
    alert("Erro ao entrar com Google: " + error.code);
  }
};
  const loginWithMicrosoft = () => signInWithPopup(auth, microsoftProvider);
  const logout = () => signOut(auth);

  return (
    <AuthContext.Provider
      value={{ user, loading, loginWithGoogle, loginWithMicrosoft, logout }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
