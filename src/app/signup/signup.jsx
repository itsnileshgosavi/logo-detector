"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const SignUp = () => {
  const router = useRouter();
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  let emailregex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      if (
        signupData.name === "" ||
        signupData.email === "" ||
        signupData.password === ""
      ) {
        toast.error("Please fill all the fields");
        return;
      } else if (!emailregex.test(signupData.email)) {
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
        setSignupData({
          name: "",
          email: "",
          password: "",
        });
        
      } else {
        console.error("Failed to register:", response.statusText);
        toast.error("failed to reg");
      }
    } catch (error) {
      console.error("Error registering in user:", error.message);
      toast.error("failed");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="bg-white w-screen font-sans text-gray-900">
      <div className=" ">
        <div className="mx-auto w-full sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl">
          <div className="mx-2 py-12 text-center md:mx-auto md:w-2/3 md:py-20">
            <h1 className="mb-4 text-3xl font-black leading-4 sm:text-5xl xl:text-6xl">
              Sign up
            </h1>
            <div className="text-lg sm:text-xl">
              <div className="">
                <p className="mb-4">
                  Let's do this! Sign Up now to checkout my awesome project.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="md:w-2/3 mx-auto w-full pb-16 sm:max-w-screen-sm md:max-w-screen-md lg:w-1/3 lg:max-w-screen-lg xl:max-w-screen-xl">
        <form className="shadow-lg mb-4 rounded-lg border border-gray-100 py-10 px-8" onSubmit={handleSignUp}>
        <div className="mb-4">
            <label className="mb-2 block text-sm font-bold" for="name" htmlFor="name">
              Name
            </label>
            <input
              className="shadow-sm w-full cursor-text appearance-none rounded border border-gray-300 py-2 px-3 leading-tight outline-none ring-blue-500 focus:ring"
              id="name"
              type="text"
              value={signupData.name}
              placeholder="Name"
              required="true"
              onChange={(e) => {
                setSignupData({
                  ...signupData,
                  name: e.target.value,
                });
              }}
            />
            <span className="my-2 block"></span>
          </div>
          <div className="mb-4">
            <label className="mb-2 block text-sm font-bold" for="email" htmlFor="email">
              E-mail
            </label>
            <input
              className="shadow-sm w-full cursor-text appearance-none rounded border border-gray-300 py-2 px-3 leading-tight outline-none ring-blue-500 focus:ring"
              id="email"
              type="email"
              value={signupData.email}
              placeholder="email"
              required="true"
              onChange={(e) => {
                setSignupData({
                  ...signupData,
                  email: e.target.value,
                });
              }}
            />
            <span className="my-2 block"></span>
          </div>
         
          <div className="mb-4">
            <label className="mb-2 block text-sm font-bold" for="password" htmlFor="password">
              Password
            </label>
            <input
              className="shadow-sm w-full cursor-text appearance-none rounded border border-gray-300 py-2 px-3 leading-tight outline-none ring-blue-500 focus:ring"
              id="password"
              type="password"
              placeholder="******************"
              required="true"
              value={signupData.password}
              onChange={(e) => {
                setSignupData({
                  ...signupData,
                  password: e.target.value,
                });
              }}
            />
          </div>
          
          <div className="flex items-center justify-center w-full">
            
            <button
              className={`rounded bg-primary py-2 px-8 text-center text-lg font-bold text-white ${isLoading? "loading loading-spinner cursor-not-allowed":"cursor-pointer"}`}
              type="submit"
            >
              Create account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
