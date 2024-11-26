import React, { useState } from 'react';
import axios from 'axios';
import { storage } from '../firebaseConfig';
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';
import useFetchUser from './useFetchUser';

const ImageUpload = () => {
  const [image, setImage] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const user = useFetchUser();
  const userId = user ? user._id : '';

  const validateImage = (file) => {
    const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!validTypes.includes(file.type)) {
      setError('Invalid file type. Please use JPEG, PNG or GIF');
      return false;
    }
    if (file.size > maxSize) {
      setError('File too large. Maximum size is 5MB');
      return false;
    }
    return true;
  };

  const handleImageChange = (event) => {
    setError(null);
    setSuccess(false);
    const file = event.target.files[0];
    if (file) {
      if (!validateImage(file)) return;
      
      setImage(file);
      // Add image preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const resetForm = () => {
    setImage(null);
    setPreview(null);
    setUploadProgress(0);
    setError(null);
  };

  const handleUpload = async () => {
    if (image) {
      try {
        setError(null);
        setSuccess(false);

        // Remove the existing image if it exists
        if (user && user.image) {
          const storageRef = ref(storage, `images/${user.image.fileName}`);
          try {
            await deleteObject(storageRef);
            console.log('Previous file deleted successfully');
          } catch (error) {
            console.log('No previous file found or error deleting:', error);
          }
        }

        const storageRef = ref(storage, `images/${image.name}`);
        const uploadTask = uploadBytesResumable(storageRef, image);

        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            setUploadProgress(progress);
          },
          (error) => {
            console.error('Upload error:', error);
            setError('Failed to upload image. Please try again.');
          },
          async () => {
            try {
              const url = await getDownloadURL(uploadTask.snapshot.ref);

              // Save image metadata to MongoDB
              await axios.post(`/api/users/${user._id}/image`, {
                fileName: image.name,
                imageUrl: url,
              });

              console.log('Image uploaded successfully.');
              setSuccess(true);
              resetForm();
            } catch (error) {
              console.error('Error saving image metadata:', error);
              setError('Failed to save image information. Please try again.');
            }
          }
        );
      } catch (error) {
        console.error('Error during upload:', error);
        setError('Failed to upload image. Please try again.');
      }
    } else {
      setError('Please select an image first.');
    }
  };

  const handleCancel = () => {
    resetForm();
  };

  return (
    <div className="my-4 max-w-md mx-auto">
      {error && (
        <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      {success && (
        <div className="mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
          <span className="block sm:inline">Image uploaded successfully!</span>
        </div>
      )}

      {preview && (
        <div className="mb-4">
          <img src={preview} alt="Preview" className="max-w-xs rounded mx-auto" />
        </div>
      )}

      <div className="mb-4">
        <input
          type="file"
          onChange={handleImageChange}
          className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
          accept="image/jpeg,image/png,image/gif"
        />
        <p className="mt-1 text-sm text-gray-500">
          SVG, PNG, JPG or GIF (Max. 5MB)
        </p>
      </div>

      <div className="flex space-x-4">
        <button
          onClick={handleUpload}
          disabled={!image}
          className={`flex-1 px-4 py-2 rounded ${!image
            ? 'bg-gray-300 cursor-not-allowed'
            : 'bg-blue-500 hover:bg-blue-600'} text-white transition-colors`}
        >
          Upload
        </button>

        {image && (
          <button
            onClick={handleCancel}
            className="flex-1 px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded transition-colors"
          >
            Cancel
          </button>
        )}
      </div>

      {uploadProgress > 0 && uploadProgress < 100 && (
        <div className="mt-4">
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
          <p className="mt-2 text-sm text-gray-600 text-center">
            Upload Progress: {uploadProgress}%
          </p>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;