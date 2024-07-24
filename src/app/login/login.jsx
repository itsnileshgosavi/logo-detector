"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Link from "next/link";

const Login = () => {
  const router = useRouter();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const signupClick = () => {
    router.push("/signup");
  };

  const handleLogin = async () => {
    
    let emailregex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    try {
      if (loginData.email === "" || loginData.password === "") {
        toast.error("Email or Password cannot be empty");
        return;
      } else if (!emailregex.test(loginData.email)) {
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

        console.log("logged in");
      } else {
        console.error("Failed to Login:", response.statusText);
        toast.error("Invalid email or Password");
      }
    } catch (error) {
      console.error("Error logging in user:", error.message);
      toast.error("failed");
    } finally {
      setIsLoading(false);
      router.refresh();
    }
  };
  return (
    <div className="flex h-screen w-screen items-center overflow-hidden px-2">
      <div className="relative flex w-96 flex-col space-y-5 rounded-lg border bg-white px-5 py-10 shadow-xl sm:mx-auto">
        <div className="-z-10 absolute top-4 left-1/2 h-full w-5/6 -translate-x-1/2 rounded-lg bg-blue-600 sm:-right-10 sm:top-auto sm:left-auto sm:w-full sm:translate-x-0"></div>
        <div className="mx-auto mb-2 space-y-3">
          <h1 className="text-center text-3xl font-bold text-gray-700">Sign in</h1>
          <p className="text-gray-500">Sign in to access your account</p>
        </div>

        <div>
          <div class="relative mt-2 w-full">
            <input
              type="text"
              id="email"
              className="border-1 peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pt-4 pb-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
              placeholder=" "
              required
              onChange={(e) => {
                setLoginData({ ...loginData, email: e.target.value });
              }}
            />
            <label
              for="email"
              className="origin-[0] peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600 absolute left-1 top-2 z-10 -translate-y-4 scale-75 transform cursor-text select-none bg-white px-2 text-sm text-gray-500 duration-300"
            >
              {" "}
              Enter Your Email{" "}
            </label>
          </div>
        </div>

        <div>
          <div class="relative mt-2 w-full">
            <input
              type="password"
              id="password"
              className="border-1 peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pt-4 pb-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
              placeholder=" "
              required
              onChange={(e) => {
                setLoginData({ ...loginData, password: e.target.value });
              }}
            />
            <label
              for="password"
              className="origin-[0] peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600 absolute left-1 top-2 z-10 -translate-y-4 scale-75 transform cursor-text select-none bg-white px-2 text-sm text-gray-500 duration-300"
            >
              {" "}
              Enter Your Password
            </label>
          </div>
        </div>
        <div className="flex w-full items-center">
          <button onClick={handleLogin} class="shrink-0 inline-block w-36 rounded-lg bg-blue-600 py-3 font-bold text-white">
            Login
          </button>
          
        </div>
        <p className="text-center text-gray-600">
          Don't have an account?
          <Link
            href="/signup"
            className="whitespace-nowrap font-semibold text-gray-900 hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
