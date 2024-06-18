// FileUpload.jsx
import React, { useState } from 'react';

const FileUpload = ({ onClose, onFileSelect, show }) => {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleUpload = () => {
        onFileSelect(selectedFile);
        onClose();
    };

    return (
        show && (
            <div className="upload-popup">
                <div className="popup-content">
                    <input type="file" onChange={handleFileChange} />
                    <button onClick={handleUpload}>Upload File</button>
                    <button onClick={onClose}>Close</button>
                </div>
            </div>
        )
    );
};

export default FileUpload;
