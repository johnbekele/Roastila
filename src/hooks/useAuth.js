import { useContext } from "react";
import { AuthContext } from "../hooks/AuthContext";

export const useAuth = () => {
  return useContext(AuthContext);
};
