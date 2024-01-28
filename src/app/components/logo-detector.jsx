"use client"
import React, { useState } from 'react';
import Clarifai from 'clarifai';

const app = new Clarifai.App({
  apiKey:process.env.NEXT_PUBLIC_CLARIFAI_KEY,
});

const LogoDetector = () => {
  const [imageUrl, setImageUrl] = useState('');
  const [logoName, setLogoName] = useState('');
  const [error, setError] = useState('');

  const handleDetect = () => {
    
    setError('');

    app.models.predict(Clarifai.LOGO_MODEL, { url: imageUrl })
      .then(response => {
       
        if (response.status.code === 10000) {
          
          const logoName = response.outputs[0].data.regions[0].data.concepts[0].name;

          
          setLogoName(logoName);
        } else {
          
          setError('Error: Unable to detect logo. Please try again.');
        }
      })
      .catch(error => {
        
        console.error('Clarifai API Error:', error);
        setError('Error: Unable to process your request. Please try again.');
      });
  };

  return (
    <div>
      <p className='flex text-lg justify-around'>
        {'This app will detect a logo in the image. Give it a try.'}
      </p>
      <div className='flex justify-center'>
        <div className='bg-white p-4 rounded-lg shadow-lg'>
          <input
            className='text-lg p-2 w-3/4 text-black'
            type='text'
            id='inputUrl'
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder='Enter Image URL'
          />
          <button
            className='w-1/4 ml-2 py-2 px-4 bg-purple-500 text-white rounded-lg'
            onClick={handleDetect}
          >
            Detect
          </button>
        </div>
      </div>
      <div className='flex justify-center w-1/2 h-52 mt-2'>
        <img id='inputimage' alt='' src={imageUrl} className=' justify-center flex' />
      </div>
      {error && (
        <div className='mt-4'>
          <p className='text-red-600'>{error}</p>
        </div>
      )}
      {logoName && (
        <div className='mt-4'>
          <p className='text-lg'>Detected Logo: {logoName}</p>
        </div>
      )}
    </div>
  );
};

export default LogoDetector;
