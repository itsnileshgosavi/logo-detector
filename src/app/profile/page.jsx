import React from "react";

export default function Home() {
  return (
    <>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">Hello User</h1>
            <p className="py-6">
              Name
            </p>
            <p className="py-6">
              email
            </p>
            <button className="btn btn-secondary hover:bg-red-800">Delete Account</button>
          </div>
        </div>
      </div>
    </>
  );
}
