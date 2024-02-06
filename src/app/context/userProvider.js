'use client'

import React, { useEffect, useState } from "react";
import UserContext from "./userContext";
import { currentUser } from "../services/userServices";




function UserProvider({ children }) {
  const [user, setUser] = useState(undefined);
  const User= currentUser();
  console.log(User)

  useEffect(() => {
    async function load() {
      try {
        const userdata = await currentUser();
        console.log(userdata)
        setUser({ ...userdata });
      } catch (error) {
        console.log(error);

        setUser(undefined);
      }
    }

    load();
  }, []);

  return (
    <UserContext.Provider value={{ user }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
