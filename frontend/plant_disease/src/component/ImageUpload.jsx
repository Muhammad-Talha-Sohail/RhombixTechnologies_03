

import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';

const ImageUpload = () => {
  const [preview, setPreview] = useState(null); // For image preview
  const [selectedFile, setSelectedFile] = useState(null); // For uploaded file
  const [data, setData] = useState(null); // Backend response
  const [isLoading, setIsLoading] = useState(false); // Loading indicator

  const sendFile = async () => {
    if (selectedFile) {
      setIsLoading(true);
      let formData = new FormData();
      formData.append("file", selectedFile);

      try {
        const res = await axios.post("http://localhost:3000/predict", formData);
        if (res.status === 200) {
          console.log("Yes",res.data);
          setData(res.data); // Store the backend response
        }
      } catch (error) {
        console.error("Error uploading the file:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const clearData = () => {
    setSelectedFile(null);
    setPreview(null);
    setData(null); // Clear the output as well
  };

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file)); // Create preview URL
      setData(null); // Clear previous data
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/*', // Accept only image files
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
      {/* Dropzone Area */}
      <div
        {...getRootProps()}
        style={{
          width: '40%',
          height: '420px',
          border: '3px dashed rgb(254, 255, 254)',
          borderRadius: '8px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: isDragActive ? '#f5e30685' :'#9b19192e' ,
          cursor: 'pointer',
          overflow: 'hidden', // Prevent overflow when displaying the image
          color: 'black',
          fontSize: '18px',
          fontFamily: 'sans-serif',
          fontWeight: 'lighter',
        
        }}
      >
        <input {...getInputProps()} />
        {preview ? (
          <img
            src={preview}
            alt="Uploaded Preview"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',

            }}
          />
        ) : isDragActive ? (
          <p>Drop your image here...</p>
        ) : (
          <p>Drag & drop an image here, or click to select one</p>
        )}
        <style jsx>{`
  @keyframes rotateBorder {
    0% {
      transform: rotate(0deg); /* Start at 0 degrees */
    }
    100% {
      transform: rotate(360deg); /* Rotate to 360 degrees */
    }
  }
`}</style>
      </div>

      {/* Submit Button */}
      <div style={{
        display: 'flex',
        gap: '10px',
        justifyContent: 'center',
        alignContent  : 'center',
        
      }}>     <button
        onClick={sendFile}
        style={{
          padding: '10px 20px',
          backgroundColor: 'transparent',
          color: 'white',
          border: 'Black 1px solid',
          borderRadius: '5px',
        fontSize: '20px',
          cursor: 'pointer',
          fontFamily: 'sans-serif',
          fontWeight: 'bolder',
        }}
        disabled={!selectedFile || isLoading}
      >
        {isLoading ? "Processing..." : "Submit"}
      </button>

      {/* Clear Button */}
      <button
        onClick={clearData}
        style={{
          padding: '10px 20px',
          backgroundColor: 'transparent',
          color: 'white',
          fontSize: '20px',
          border: 'Black 1px solid',
          borderRadius: '5px',
          cursor: 'pointer',
          fontFamily: 'sans-serif',
          fontWeight: 'bolder',
        }}
        disabled={!selectedFile}
      >
        Clear
      </button>
      </div>
 

      {/* Output Display */}
      {data && !isLoading && (
        <div
          style={{
            marginTop: '20px',
            padding: '20px',
            border: '1px solid #ccc',
            borderRadius: '8px',
            backgroundColor: '#f9f9f9',
            width: '40%',
            textAlign: 'center',
            display: 'flex',
     justifyContent: 'space-around',
       color: 'white',
       fontSize: '20px',
       fontFamily: 'sans-serif',
       backgroundColor: '#1c411670',
       border : '3px dashed white',  
          }}
        >
          {/* <h3>Prediction Output</h3> */}
          <p style={{
             display: 'flex',
              flexDirection: 'column',
              
          }}><strong>Label:</strong> {data.class}</p>
          <p  style={{
             display: 'flex',
              flexDirection: 'column',
              
              
          }}><strong>Confidence:</strong> {(parseFloat(data.confidence) * 100).toFixed(2)}%</p>
        </div>
      )}
    </div>
    
  );
  
};

export default ImageUpload;
