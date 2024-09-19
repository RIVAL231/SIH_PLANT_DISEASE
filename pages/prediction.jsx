import { useState } from 'react';
import "./global.css";
import { Chatbot } from '@/components/chatbot';

export default function PlantDiseaseClassifier() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [plantType, setPlantType] = useState('Select Plant Type');
  const [result, setResult] = useState('');
  const [imagePreview, setImagePreview] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setImagePreview(URL.createObjectURL(file)); // Generate and set the image preview
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    event.currentTarget.classList.add('dragover');
  };

  const handleDragLeave = (event) => {
    event.currentTarget.classList.remove('dragover');
  };

  const handleDrop = (event) => {
    event.preventDefault();
    event.currentTarget.classList.remove('dragover');
    if (event.dataTransfer.files.length > 0) {
      const file = event.dataTransfer.files[0];
      setSelectedFile(file);
      setImagePreview(URL.createObjectURL(file)); // Generate and set the image preview
    }
  };

  const uploadImage = async () => {
    if (!selectedFile) {
      alert('Please select a file.');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('plant_type', plantType);

    try {
      const response = await fetch('http://localhost:8000/predict', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok. Status: ' + response.statusText);
      }

      const data = await response.json();
      setResult(`Class: ${data.class}, Confidence: ${data.confidence}`);
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      alert('There was a problem with the upload. Check the console for more details.');
    }
  };

  return (
    <div className="main">
      <Chatbot />
      <div className="container">
        <h1 style={{margin:"0"}}>Plant Disease Classifier</h1>
        <select id="plantType" value={plantType} onChange={(e) => setPlantType(e.target.value)}>
          <option value="Potato">Potato</option>
          <option value="Mango">Mango</option>
          <option value="Rice">Rice</option>
          <option value="Tea">Tea</option>
          <option value="Cauliflower">Cauliflower</option>
          <option value="Wheat">Wheat</option>
          <option value="Brinjal">Brinjal</option>
          <option value="PepperBell">PepperBell</option>
          <option value="Tomato">Tomato</option>
          <option value="Apple">Apple</option>
          <option value="Corn">Corn</option>
          <option value="Grape">Grape</option>
          <option value="Cherry">Cherry</option>
          <option value="Peach">Peach</option>
        </select>
        <div
          className="upload-box"
          id="uploadBox"
          onClick={() => document.getElementById('fileInput').click()}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {imagePreview ? (
            <img className='img1' src={imagePreview} alt="Selected file" />
          ) : (
            <>Drag & Drop or Click to Upload Image</>
          )}
          <input
            type="file"
            id="fileInput"
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
        </div>
        <button id="uploadButton" onClick={uploadImage}>
          Check Now
        </button>
        <div id="result">{result}</div>
      </div>
    </div>
  );
}
