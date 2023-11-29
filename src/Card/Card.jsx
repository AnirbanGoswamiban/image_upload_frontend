import axios from 'axios';
import React from 'react';

const FileCard = ({ filename, fileType, postedBy ,fileId,url}) => {
  // Define icons for different file types
  const fileTypeImages = {
    jpg: 'https://cdn-icons-png.flaticon.com/512/2659/2659360.png',
    Docs: 'fa-solid fa-envelope', // This class seems incorrect, it should be a Font Awesome class
    pdf: 'https://cdn-icons-png.flaticon.com/512/4726/4726010.png',
  };


  const imageSrc = fileTypeImages[fileType] || 'generic.png';


  const handleDownload = () => {
 
    window.open(url,'_parent');
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 w-64">
      <div className="flex items-center">
        <div className="w-20 h-20 rounded-full bg-500 flex items-center justify-center text-white text-2xl">
          <img src={imageSrc} alt={`File type: ${fileType}`} />
        </div>
        <div className="ml-4">
          <p className="text-lg font-semibold">{filename.length > 12 ? `${filename.slice(0, 12)}...` : filename}</p>
          <p className="text-sm text-gray-600">{fileType}</p>
        </div>
      </div>
      <div className="mt-4">
        <p className="text-sm text-gray-500">Posted by: {postedBy}</p>
        <button className="bg-blue-500 text-white px-2 py-1 rounded mt-2" onClick={handleDownload}>
          Download
        </button>
      </div>
    </div>
  );
};

export default FileCard;
