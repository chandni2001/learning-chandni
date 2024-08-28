import React, { useState, useRef } from 'react';
import './FileUploder.css';  

const FileUploader = () => {
  const [selectedFiles, setSelectedFiles] = useState({
    documents: [],
    images: [],
    videos: []
  });
  const fileInputRefs = {
    documents: useRef(null),
    images: useRef(null),
    videos: useRef(null),
  };

  const handleFileChange = (event, category) => {
    const files = Array.from(event.target.files);

    // Append new files to existing files
    setSelectedFiles(prevFiles => ({
      ...prevFiles,
      [category]: [...prevFiles[category], ...files]
    }));

    uploadFiles(files, category);
  };

  const uploadFiles = (files, category) => {
    files.forEach(file => {
      const formData = new FormData();
      formData.append('file', file);

      fetch(`http://localhost:3000/uploads/${category}`, {
        method: 'POST',
        body: formData,
      })
      .then(response => response.json())
      .then(data => console.log('Success:', data))
      .catch(error => {
        console.error('Error:', error);
        alert('Upload failed. Please check console for details.');
      });
    });
  };

  const handleDelete = (file, category) => {
    setSelectedFiles(prevFiles => ({
      ...prevFiles,
      [category]: prevFiles[category].filter(f => f !== file)
    }));
  };

  return (
    <div className="file-uploader">
      <h1>Upload Your Files</h1>
      
      <div className="upload-section">
        <h2>Documents</h2>
        <input
          type="file"
          accept=".doc,.docx,.pdf"
          ref={fileInputRefs.documents}
          onChange={(e) => handleFileChange(e, 'documents')}
          id="documents"
          style={{ display: 'none' }}
        />
        <label htmlFor="documents" className="custom-file-upload">
          Choose Document
        </label>
        <div className="file-preview">
          {selectedFiles.documents.map((file, index) => (
            <div key={index} className="file-item">
              <span>{file.name}</span>
              <button onClick={() => handleDelete(file, 'documents')} className="delete-button">Delete</button>
            </div>
          ))}
        </div>
      </div>
      
      <div className="upload-section">
        <h2>Profile Pictures</h2>
        <input
          type="file"
          multiple
          accept=".jpg,.jpeg,.gif"
          ref={fileInputRefs.images}
          onChange={(e) => handleFileChange(e, 'images')}
          id="images"
          style={{ display: 'none' }}
        />
        <label htmlFor="images" className="custom-file-upload">
          Choose Profile Picture(s)
        </label>
        <div className="file-preview">
          {selectedFiles.images.map((file, index) => (
            <div key={index} className="file-item">
              <span>{file.name}</span>
              <button onClick={() => handleDelete(file, 'images')} className="delete-button">Delete</button>
            </div>
          ))}
        </div>
      </div>
      
      <div className="upload-section">
        <h2>Video</h2>
        <input
          type="file"
          accept=".mp4,.wmv"
          ref={fileInputRefs.videos}
          onChange={(e) => handleFileChange(e, 'videos')}
          id="videos"
          style={{ display: 'none' }}
        />
        <label htmlFor="videos" className="custom-file-upload">
          Choose Video
        </label>
        <div className="file-preview">
          {selectedFiles.videos.map((file, index) => (
            <div key={index} className="file-item">
              <span>{file.name}</span>
              <button onClick={() => handleDelete(file, 'videos')} className="delete-button">Delete</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FileUploader;
