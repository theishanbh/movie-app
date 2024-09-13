"use client";

import {
  refreshToken,
  registerUser,
  signInUser,
  signOutUser,
} from "@/apis/auth";
import { useRouter } from "next/navigation";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { AuthContextProps } from "../../types/context";
import { User } from "../../types/user";

const AuthContext = createContext<AuthContextProps | null>(null);

// Make a provider that will replace Context.Provider
// pass the children props to this provider
function AuthProvider({ children }: { children: ReactNode }) {
  // all use state and useeffect and other state logic goes here

  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Automatically refresh access token on component mount
    refreshAccessToken();
  }, []);

  // Refresh the access token if available
  const refreshAccessToken = async () => {
    try {
      const tokenData = await refreshToken(); // Calls API to refresh the access token
      console.log(tokenData);
      if (tokenData) {
        setAccessToken(tokenData.accessToken);
        setUser(tokenData.user); // Assuming refreshToken response includes user info
      } else {
        setUser(null);
        setAccessToken(null);
      }
    } catch (error) {
      console.error("Error refreshing access token", error);
      setUser(null);
      setAccessToken(null);
    } finally {
      setLoading(false);
    }
  };

  // Register new user
  const register = async (
    username: string,
    email: string,
    password: string
  ) => {
    setLoading(true);
    try {
      const response = await registerUser(username, email, password);
      if (response.accessToken) {
        setAccessToken(response.accessToken);
        setUser(response.user); // Set user data after successful registration
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Error registering", error);
    } finally {
      setLoading(false);
    }
  };

  // Login existing user
  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const response = await signInUser(email, password);
      if (response.accessToken) {
        setAccessToken(response.accessToken);
        setUser(response.user); // Set user data after successful login
        router.push("/");
      }
    } catch (error) {
      console.error("Error logging in", error);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await signOutUser(); // Calls API to clear the refresh token (cookie)
      setUser(null);
      setAccessToken(null);
      router.push("/");
    } catch (error) {
      console.error("Error logging out", error);
    }
  };

  // Check if the access token has expired and refresh it
  const checkAccessToken = async () => {
    if (!accessToken) {
      await refreshAccessToken();
    }
    // You can also add logic to check token expiration using JWT expiration time if needed
  };

  //   add values such as states and functions you need to pass
  const value: AuthContextProps = {
    user: user,
    accessToken,
    setAccessToken,
    register,
    login,
    logout,
    loading,
    checkAccessToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// make a use hook that easily lets you use all the data
const useAuth = () => {
  const authContext = useContext(AuthContext);
  if (authContext === undefined)
    //   informs whether the provider is being used out of provider hook
    throw new Error("PostContext was used outside of the PostProvider");
  return authContext;
};

export { AuthProvider, useAuth };
