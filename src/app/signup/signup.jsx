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
  const [ isLoading, setIsLoading] = useState(false);

  
  const  loginClick= () => {
    router.push("/login");
  };
  let emailregex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  const handleSignUp = async () => {
    try {
      setIsLoading(true);
      if (signupData.name === "" || signupData.email === "" || signupData.password === "") {
        toast.error("Please fill all the fields");
        return; 
      }else if(!emailregex.test(signupData.email)){
        toast.error("Please enter valid email");
        return;
      }
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupData),
      });

      if (response.ok) {
        toast.success("Registered successfully");
        
      } else {
        console.error("Failed to register:", response.statusText);
        toast.error("failed to reg");
      }
    } catch (error) {
      console.error("Error registering in user:", error.message);
      toast.error("failed");
    }finally{
      setIsLoading(false);
      
    }
  };
  return (
    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-slate-800 mx-auto h-full my-10 text-white">
      <form className="card-body" onSubmit={()=>handleSignUp()}>
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
          <button type="submit" className={`btn btn-primary flex justify-center items-center ${isLoading ? "loading loading-ring btn-disabled" : ""}`} disabled={isLoading} >Sign UP</button>
          <button className="btn btn-secondary my-5" onClick={()=>loginClick()}>Login Instead?</button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
