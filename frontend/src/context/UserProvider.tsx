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
    fetch("/api/users/me")
      .then((data) => {
        if (data.ok) {
          return data.json();
        }
        throw new Error(`Unable to get data!`);
      })
      .then((data) => setUser({ isLoading: false, data }))
      .catch(() => setUser({ isLoading: false, data: null }));
  }, []);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export default UserProvider;
