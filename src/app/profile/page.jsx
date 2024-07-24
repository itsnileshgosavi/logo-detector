"use client";

import React from "react";
import { useContext } from "react";
import UserContext from "../context/userContext";
import { useRouter } from "next/navigation";
import { logout } from "../services/userServices";
import { toast } from "react-toastify";

export default function ProfilePage() {
  const context = useContext(UserContext);
  const router = useRouter();

  const email = context.user[0]?.email;
  console.log(email);

  const deleteAccount = async () => {
    const isConfirmed = window.confirm(
      `Are you sure you want to delete your account?`
    );

    if (isConfirmed) {
      try {
        const response = await fetch("/api/delete-user", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
          }),
        });

        const result = await logout();
        window.location.reload();
        router.push("/login");
        toast.info("Logged out");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <div className="hero min-h-screen bg-neutral text-primary">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold font-montserrat">
              Hello {context.user[0]?.name}!
            </h1>
            <p className="my-4 font-poppins">{context.user[0]?.name}</p>
            <p className="my-5 font-poppins">{context.user[0]?.email}</p>
            <button
              className="btn bg-red-600 text-secondary hover:bg-red-800"
              onClick={() => deleteAccount()}
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
