"use client";
import React from "react";
import UserContext from "../context/userContext";
import { useContext } from "react";
import { useRouter } from "next/navigation";

const LogoDetector = () => {
  const context = useContext(UserContext);
  const router = useRouter();
  return (
    <div className="min-h-screen bg-neutral text-white flex flex-col md:flex-row items-center">
      <div className=" text-left w-1/2 mx-auto md:ml-20 order-2 md:order-1">
        <h1 className="md:text-5xl text-xl font-montserrat text-primary uppercase font-bold">
          Detect Logo in an Image
        </h1>
        <p className="py-6 font-poppins text-primary font-light">
          This app can detect the logo of most international companies. All you
          have to do is copy the image address and paste it in the input. The
          app will detect the logo and return the name of the company.
        </p>
        <div className="flex md:flex-row flex-col  items-center">
          <button
            className="btn btn-primary my-5 uppercase text-xs p-2 md:text-sm"
            onClick={() => router.push("/detect")}
          >
            Detect With Clarifai
          </button>

          <button
            className="btn btn-primary mx-2 uppercase text-xs p-2 md:text-sm"
            onClick={() => router.push("/genai")}
          >
            Detect With AI<div class="badge bg-accent text-white">New</div>
          </button>
        </div>
      </div>
      <div className="w-1/2 my-10 flex justify-center items-center order-1 md:order-2 h-1/2">
        <img
          src="/logo-detect.png"
          className="mix-blend-multiply"
          alt="logo detection img"
        />
      </div>
    </div>
  );
};

export default LogoDetector;
