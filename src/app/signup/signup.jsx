"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const SignUp = () => {
  const router = useRouter();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };
  const signupClick = () => {
    router.push("/signup");
  };

  const handleClick = async () => {
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      if (response.ok) {
        toast.success("User Logged In successfully");
        document.location.reload();
        router.push("/your-tasks");
      } else {
        console.error("Failed to Login:", response.statusText);
        toast.error("Invalid email or Password");
      }
    } catch (error) {
      console.error("Error logging in user:", error.message);
      toast.error("failed");
    }
  };
  return (
    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100 mx-auto h-full">
      <form className="card-body">
      <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input
            type="Name"
            placeholder="Enter your name"
            className="input input-bordered"
            required
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            placeholder="email"
            className="input input-bordered"
            required
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            type="password"
            placeholder="password"
            className="input input-bordered"
            required
          />
         
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary">Sign UP</button>
          <button className="btn btn-secondary my-5">Login</button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
