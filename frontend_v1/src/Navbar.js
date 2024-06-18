// Navbar.jsx
import React, { useState } from 'react';
import './Navbar.css';
import FileUpload from './FileUpload'; // Import the FileUpload component

const Navbar = () => {
    const [showUploadPopup, setShowUploadPopup] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileSelect = (file) => {
        setSelectedFile(file);
        // Additional logic for handling file upload can be added here
    };

    return (
        <div className="navbar">
            <div className="navbar-brand">Study Card Generator</div>
            <div className="upload-button">
                <button onClick={() => setShowUploadPopup(true)}>Upload</button>
            </div>
            <FileUpload
                show={showUploadPopup}
                onClose={() => setShowUploadPopup(false)}
                onFileSelect={handleFileSelect}
            />
        </div>
    );
};

export default Navbar;
