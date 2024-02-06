'use client'

import React, { useEffect, useState } from "react";
import UserContext from "./userContext";
import { currentUser } from "../services/userServices";

function UserProvider({ children }) {
  const [user, setUser] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadUserData() {
      try {
        const userData = await currentUser();
        setUser({ ...userData });
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError(error);
        setIsLoading(false);
      }
    }

    loadUserData();
  }, []);

  if (isLoading) {
    // You can return a loading indicator here
    return <div>Loading...</div>;
  }

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
