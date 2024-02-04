"use client";
import React, { useState } from "react";
import Clarifai from "clarifai";

const app = new Clarifai.App({
  apiKey: process.env.NEXT_PUBLIC_CLARIFAI_KEY,
});

const LogoDetector = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [logoName, setLogoName] = useState("");
  const [error, setError] = useState("");

  const handleDetect = () => {
    setError("");

    app.models
      .predict(Clarifai.LOGO_MODEL, { url: imageUrl })
      .then((response) => {
        if (response.status.code === 10000) {
          const logoName =
            response.outputs[0].data.regions[0].data.concepts[0].name;

          setLogoName(logoName);
        } else {
          setError("Error: Unable to detect logo. Please try again.");
        }
      })
      .catch((error) => {
        console.error("Clarifai API Error:", error);
        setError("Error: Unable to process your request. Please try again.");
      });
  };

  return (
    <div>
      <div>
        <div className="hero min-h-screen bg-base-200">
          <div className="hero-content text-center">
            <div className="max-w-md">
              <h1 className="text-5xl font-bold">Hi there</h1>
              <p className="py-6">
                This app can detect the logo of most international companies.
                All you have to do is copy the image address and paste it in the
                input. The app will detect the logo and return the name of the
                company.
              </p>
              <a href="#detect">
                <button className="btn btn-primary">Let's Try</button>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div id="detect" className="hero min-h-screen bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <div className="card w-96 bg-base-100 shadow-xl my-10">
              <div className="card-body items-center text-center">
                <h2 className="card-title">Welcome!</h2>
                <p>This app will detect a logo in the image. Give it a try.</p>

                <input
                  className="input input-bordered w-full max-w-xs my-10"
                  type="text"
                  id="inputUrl"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="Enter Image URL"
                />
                <figure className="px-10 pt-10">
                  <img src={imageUrl} alt="" className="rounded-xl" />
                </figure>
                <div className="card-actions">
                  <button className="btn btn-primary" onClick={handleDetect}>
                    Detect
                  </button>
                </div>
                <div className="card-body items-center text-center">
                  {logoName ? (
                    <div className="mt-4">
                      <p className="text-lg font-bold text-primary">
                        Detected Logo: {logoName}
                      </p>
                    </div>
                  ) : (
                    <div className="mt-4">
                      <p className="text-red-600">{error}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoDetector;
