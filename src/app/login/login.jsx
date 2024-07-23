"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const Login = () => {
  const router = useRouter();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [ isLoading, setIsLoading] = useState(false);

  const signupClick = () => {
    router.push("/signup");
  };

  const handleLogin = async () => {
   let emailregex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    try {
      if (loginData.email === "" || loginData.password === "") {
        toast.error("Email or Password cannot be empty");
        return;
        
      }else if(!emailregex.test(loginData.email)){
        toast.error("Please enter valid email");
        return;
      }
      setIsLoading(true);
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      if (response.ok) {
        toast.success("Success!!");
        router.push("/");
       
          console.log("logged in")
      } else {
        console.error("Failed to Login:", response.statusText);
        toast.error("Invalid email or Password");
      }
    } catch (error) {
      console.error("Error logging in user:", error.message);
      toast.error("failed");
    }finally{
      setIsLoading(false);
      router.refresh();
    }
  };
  return (
    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-gray-800 mx-auto h-full border border-white my-10 text-white">
      <div className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            placeholder="enter your email here"
            className="input input-bordered"
            onChange={(event) => {
              setLoginData({
                ...loginData,
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
            placeholder="enter your password here"
            className="input input-bordered"
            onChange={(event) => {
              setLoginData({
                ...loginData,
                password: event.target.value,
              });
            }}
            required
          />
          <label className="label">
            <a href="#" className="label-text-alt link link-hover">
              Forgot password?
            </a>
          </label>
        </div>
        <div className="form-control mt-6">
          <button className={`btn btn-primary flex justify-center items-center ${isLoading ? "loading loading-ring btn-disabled" : ""}`} disabled={isLoading} onClick={handleLogin}>Login</button>
          <button className="btn btn-secondary my-5" onClick={signupClick}>Sign Up</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
