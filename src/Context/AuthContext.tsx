import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { parseCookies, destroyCookie, setCookie } from "nookies";
import { login, verifyToken } from "../services/auth";

type AuthProviderProps = {
  children: ReactNode;
};

type AuthContextData = {
  signInByEmail: (email: string, password: string) => Promise<AuthResult>;
  signOutData: () => Promise<void>;
  user: ReadUsersDto | undefined;
  isAuthenticated: boolean;
  controllerAtt: boolean;
  setControllerAtt: (value: boolean) => void;
};

interface AuthResult {
  success: boolean;
  user?: ReadUsersDto;
  errorMessage?: string;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

let authChannel: BroadcastChannel;

export async function signOutData() {
  destroyCookie(undefined, "auth.token", {
    path: "/",
  });
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<ReadUsersDto>();
  const [controllerAtt, setControllerAtt] = useState(false);
  const isAuthenticated = !!user;

  const getUserInfos = async () => {
    const { "auth.token": token } = parseCookies();

    if (token) {
      try {
        const response: ReadUsersDto | undefined = await verifyToken();
        if (response) {
          const { uuid, name, email, createdAt, updatedAt, type } = response;
          setUser({ uuid, name, email, createdAt, updatedAt, type });
        }
      } catch (error) {
        signOutData();
      }
    }
  };

  useEffect(() => {
    authChannel = new BroadcastChannel("auth");

    authChannel.onmessage = (message) => {
      switch (message?.data) {
        case "signOut":
          signOutData();
          break;
        default:
          break;
      }
    };
  }, []);

  useEffect(() => {
    getUserInfos();
  }, []);

  const signInByEmail = async (
    email: string,
    password: string
  ): Promise<AuthResult> => {
    try {
      const response = await login({ email, password });
  
      if (!response) {
        return { success: false, errorMessage: "Authentication failed." };
      }
  
      const { accessToken, userData } = response;
  
      setCookie(undefined, "auth.token", accessToken, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: "/",
      });
  
      setUser(userData);
      authChannel.postMessage("signIn");
  
      return { success: true, user: userData };
    } catch (err) {
      return { success: false, errorMessage: "Error during authentication." };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        signInByEmail,
        signOutData,
        isAuthenticated,
        user,
        controllerAtt,
        setControllerAtt,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
