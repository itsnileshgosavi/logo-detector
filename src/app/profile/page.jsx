'use client'

import React from "react";
import { useContext } from "react";
import UserContext from "../context/userContext";

export default function ProfilePage() {
  const context = useContext(UserContext);
  
  return (
    <>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">Hello {context.user[0].name}!</h1>
            <p className="py-6">
              {context.user[0].name}
            </p>
            <p className="py-6">
              {context.user[0].email}
            </p>
            <button className="btn btn-secondary hover:bg-red-800">Delete Account</button>
          </div>
        </div>
      </div>
    </>
  );
}
