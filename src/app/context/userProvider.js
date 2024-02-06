"use client"

import React, { useEffect, useState } from "react";
import UserContext from "./userContext";
import { httpAxios } from "../helper/httpHelper";


async function currentUser() {
  const result = await httpAxios
    .get("/api/current-user")
    .then((response) => response.data);
  return result;
}

function UserProvider({ children }) {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    async function load() {
      try {
        const tempUser = await currentUser();
        console.log(tempUser);
        setUser({ ...tempUser });
      } catch (error) {
        console.log(error);

        setUser(undefined);
      }
    }

    load();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
