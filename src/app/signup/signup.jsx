"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const SignUp = () => {
  const router = useRouter();
  const [signupData, setSignupData] = useState({
    name:"",
    email: "",
    password: "",
  });

  
  const  loginClick= () => {
    router.push("/login");
  };

  const handleSignUp = async () => {
    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupData),
      });

      if (response.ok) {
        toast.success("Registered successfully");
        
        router.push("/login");
      } else {
        console.error("Failed to register:", response.statusText);
        toast.error("failed to reg");
      }
    } catch (error) {
      console.error("Error registering in user:", error.message);
      toast.error("failed");
    }
  };
  return (
    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100 mx-auto h-full">
      <div className="card-body">
      <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input
            type="Name"
            placeholder="Enter your name"
            className="input input-bordered"
            onChange={(event) => {
              setSignupData({
                ...signupData,
                name: event.target.value,
              });
            }}
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
            onChange={(event) => {
              setSignupData({
                ...signupData,
                email: event.target.value,
              });
            }}
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
            onChange={(event) => {
              setSignupData({
                ...signupData,
                password: event.target.value,
              });
            }}
            required
          />
         
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary" onClick={()=>handleSignUp()}>Sign UP</button>
          <button className="btn btn-secondary my-5" onClick={()=>loginClick()}>Login Instead?</button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
