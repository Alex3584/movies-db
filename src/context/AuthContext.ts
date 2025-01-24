import { createContext } from "react";

export const anonymousUser = {
  name: "Anonymous",
};

export interface AuthInfo {
  user: {
    name: string;
  };
}

export const AuthContext = createContext<AuthInfo>({ user: anonymousUser });
