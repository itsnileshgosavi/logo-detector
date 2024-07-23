"use client";
import React from "react";
import UserContext from "../context/userContext";
import { useContext } from "react";
import { useRouter } from "next/navigation";



const LogoDetector = () => {
  const context =useContext(UserContext);
  const router = useRouter();
  return (
    
    <div>
      <div>
        <div className="hero min-h-screen bg-base-200 text-white">
          <div className="hero-content text-center">
            <div className="max-w-md">
              <h1 className="text-5xl font-bold">Hi {context.user[0]?.name}!</h1>
              <p className="py-6">
                This app can detect the logo of most international companies.
                All you have to do is copy the image address and paste it in the
                input. The app will detect the logo and return the name of the
                company.
              </p>
              
                <button className="btn btn-primary my-5" onClick={() => router.push("/detect")}>Detect With Clarifai</button>
             
              
                <button className="btn btn-primary mx-2" onClick={() => router.push("/genai")}>Detect With AI<div class="badge bg-blue-700">New</div></button>
             
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default LogoDetector;
