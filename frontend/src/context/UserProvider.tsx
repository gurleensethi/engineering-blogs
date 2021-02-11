import { createContext, FC, useEffect, useState } from "react";
import { User } from "../types";

type UserContextData = { data: User | null; isLoading: boolean };

export const UserContext = createContext<UserContextData>({
  isLoading: false,
  data: null,
});

const UserProvider: FC = ({ children }) => {
  const [user, setUser] = useState<UserContextData>(() => ({
    isLoading: true,
    data: null,
  }));

  useEffect(() => {
    fetch("/api/v1/api/users/me")
      .then((data) => data.json())
      .then((data) => setUser({ isLoading: false, data }))
      .catch(() => setUser({ isLoading: false, data: null }));
  }, []);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export default UserProvider;
