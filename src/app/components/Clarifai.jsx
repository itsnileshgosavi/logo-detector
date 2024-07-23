'use client'
import React, { useState } from "react";
import Clarifai from "clarifai";

const app = new Clarifai.App({
  apiKey: process.env.NEXT_PUBLIC_CLARIFAI_KEY,
});

const Clarifaiii = () => {
    const [imageUrl, setImageUrl] = useState("");
  const [logoName, setLogoName] = useState("");
  const [error, setError] = useState("");



  const handleDetect = () => {
    let urlregex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
    setError("");
    if (imageUrl.trim() === "" || !urlregex.test(imageUrl)) {
      setError("Please enter a valid image URL.");
      return;
    }
    app.models
      .predict(Clarifai.LOGO_MODEL, { url: imageUrl })
      .then((response) => {
        if (response.status.code === 10000) {
          const logoName =
            response.outputs[0].data.regions[0].data.concepts[0].name;

          setLogoName(logoName);
        } else {
          setError("Error: Unable to detect logo. Please try again or try a different image URL.");
        }
      })
      .catch((error) => {
        console.error("Clarifai API Error:", error);
        setError("API Error: Unable to process your request. Please try again.");
      });
  };
  
  const handleReset=()=>{
    setImageUrl("");
    setLogoName("");
    setError("");
  }
  return (
    <div id="detect" className="hero min-h-screen bg-base-200 text-white">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <div className="card w-auto bg-base-100 shadow-xl my-10">
              <div className="card-body items-center text-center">
                <h2 className="card-title">Welcome!</h2>
                <p>This app can detect a logo in the image. Give it a try.</p>
                
                  <input
                    className="input input-bordered w-full max-w-xs my-10"
                    type="text"
                    id="inputUrl"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="Enter Image URL"
                    required
                  />
                  <figure className="px-10 pt-10">
                    <img src={imageUrl} alt="" className="rounded-xl" />
                  </figure>
                  <div className="card-actions">
                    <button className="btn btn-primary" type="submit"onClick={handleDetect}>
                      Detect
                    </button>
                    
                    <button
                      type="reset"
                      className="btn btn-ghost bg-red-600 hover:bg-red-900"
                      onClick={() => handleReset()}
                    >
                      Reset
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
  )
}

export default Clarifaiii