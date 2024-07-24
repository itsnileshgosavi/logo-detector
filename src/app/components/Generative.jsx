import React, { useState } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { toast } from 'react-toastify';



// Access your API key as an environment variable
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GENERATIVE_AI_KEY);

const Generative = () => {  
    const [url, setUrl] = useState("");
    const [file, setFile] = useState(null);
    const [prompt, setPrompt] = useState('');
    const [loading, setLoading] = useState(false);
    const [genarativeresponse, setGenarativeResponse] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    const handleGenerate = async () => {
        if(!prompt){
          setPrompt("Can you detect the logo in the image?");
        }
        let imageParts;

        if (file) {
            imageParts = await fileToGenerativePartFromFile(file, file.type);
        } else if (url) {
            imageParts = await fileToGenerativePartFromUrl(url, "image/png");
        }else{
            toast.info("Please select an image or enter a URL");
            return;
        }

        if (imageParts) {
            setLoading(true);
            const result = await model.generateContent([prompt, imageParts]);
            const response = await result.response;
            const text = await response.text();
            setGenarativeResponse(text);
            setLoading(false);
        }
    };

    // Converts a file object to a GoogleGenerativeAI.Part object.
    async function fileToGenerativePartFromFile(file, mimeType) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64Data = reader.result.split(',')[1];
                setSelectedImage(reader.result); // Set the base64 string of the image
                resolve({
                    inlineData: {
                        data: base64Data,
                        mimeType
                    },
                });
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    }

    // Converts a URL to a GoogleGenerativeAI.Part object.
    async function fileToGenerativePartFromUrl(path, mimeType) {
        try {
            const response = await fetch(path);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.blob();
            return fileToGenerativePartFromFile(data, mimeType);
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
            return null;
        }
    }
    const handlereset = () => {
        setGenarativeResponse("");
        setUrl("");
        setFile(null);
        setPrompt("");
        setSelectedImage(null);
    }
    

    return (
        <div className='bg-neutral w-auto h-auto p-5 flex flex-col items-center text-primary'>
            <input
                className='input input-bordered bg-secondary dark:text-black dark:bg-white w-full max-w-xs my-10'
                type="url"
                name="url"
                id="url"
                placeholder="Enter URL"
                onChange={(e) => {
                    setUrl(e.target.value);
                    setFile(null); // Clear file input when URL is entered
                }}
            />
            {url && <img className='my-10 w-36 h-auto' src={url} alt="image"/>}
            <div class="divider">OR</div>
            <input
                className='file-input file-input-bordered bg-secondary dark:bg-white dark:text-black w-full max-w-xs my-10'
                type="file"
                name="inputimg"
                id="inputimg"
                onChange={(e) => {
                    setFile(e.target.files[0]);
                    setUrl(''); // Clear URL input when file is selected
                }}
            />
           
            <textarea name="prompt" id="prompt" className='textarea bg-secondary textarea-bordered dark:bg-white dark:text-black my-5' placeholder='Enter prompt (Optional) Example: Can you describe the logo in the image?' onChange={(e)=>{setPrompt(e.target.value)}}  rows='5'></textarea>
            <button className='btn btn-primary' disabled={loading} onClick={handleGenerate}>Generate <img src="./gemini.png" alt="" className={`w-5 h-5 ${ loading ? 'animate-spin' : ''}` } /></button>
            <button className='btn btn-error mx-2 my-3' onClick={handlereset}>Clear</button>
            {selectedImage && (
        <div className='my-5'>
          <img src={selectedImage} alt="Selected" className='w-full max-w-xs' />
        </div>
      )}
            <div className='my-10'>{genarativeresponse}</div>
        </div>
    );
}

export default Generative;

