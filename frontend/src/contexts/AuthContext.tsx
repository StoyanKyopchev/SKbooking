import React, { useState, useEffect } from "react";

const SERVER_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

type AuthContextProps = {
  children: React.ReactNode;
};

type AuthContext = {
  isSignedIn: boolean;
  validateToken: () => void;
  signOut: () => void;
};

export const AuthContext = React.createContext<AuthContext | undefined>(
  undefined
);

export const signOut = async () => {
  const response = await fetch(`${SERVER_BASE_URL}/api/auth/sign-out`, {
    credentials: "include",
    method: "POST",
  });

  if (!response.ok) {
    throw new Error("Failed to sign out");
  }
};

export const AuthContextProvider = ({ children }: AuthContextProps) => {
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  const validateToken = async () => {
    try {
      const response = await fetch(
        `${SERVER_BASE_URL}/api/auth/validate-token`,
        {
          credentials: "include",
        }
      );

      const data = await response.json();

      setIsSignedIn(true);

      if (!response.ok) {
        setIsSignedIn(false);
        throw new Error(`${data.message}`);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  };

  useEffect(() => {
    validateToken();
  }, []);

  return (
    <AuthContext.Provider
      value={{ isSignedIn: isSignedIn, validateToken, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};
