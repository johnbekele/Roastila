import { useCallback, useState } from "react";

function useAuth() {
  const [user, setUser] = useState(null);

  const login = useCallback((userData) => setUser(userData), []);
  const logout = useCallback(() => setUser(null), []);

  return { user, login, logout };
}

export default useAuth;
