'use client'

import React, { useState } from 'react'
import { motion } from "framer-motion"
import { UploadIcon, ChevronDownIcon } from 'lucide-react'
import './plant-disease-classifier.css'
import { Chatbot } from '@/components/chatbot'

const plantTypes = [
  "Potato", "Mango", "Rice", "Tea", "Cauliflower", "Wheat", "Brinjal",
  "PepperBell", "Tomato", "Apple", "Corn", "Grape", "Cherry", "Peach"
]

export default function prediction() {
  const [selectedFile, setSelectedFile] = useState(null)
  const [plantType, setPlantType] = useState('Select Plant Type')
  const [result, setResult] = useState('')
  const [remedy, setRemedy] = useState('')
  const [imagePreview, setImagePreview] = useState(null)
  const [isSelectOpen, setIsSelectOpen] = useState(false)

  const handleFileChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      setSelectedFile(file)
      setImagePreview(URL.createObjectURL(file))
    }
  }

  const handleDragOver = (event) => {
    event.preventDefault()
    event.currentTarget.classList.add('drag-over')
  }

  const handleDragLeave = (event) => {
    event.currentTarget.classList.remove('drag-over')
  }

  const handleDrop = (event) => {
    event.preventDefault()
    event.currentTarget.classList.remove('drag-over')
    if (event.dataTransfer.files.length > 0) {
      const file = event.dataTransfer.files[0]
      setSelectedFile(file)
      setImagePreview(URL.createObjectURL(file))
    }
  }

  const uploadImage = async () => {
    if (!selectedFile) {
      alert('Please select a file.')
      return
    }

    const formData = new FormData()
    formData.append('file', selectedFile)
    formData.append('plant_type', plantType)

    try {
      const response = await fetch('https://sih-plant-disease.onrender.com/predict', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Network response was not ok. Status: ' + response.statusText)
      }

      const data = await response.json()
      setResult(`Class: ${data.class}, Confidence: ${data.confidence}`)
      // Set a mock remedy for demonstration purposes
      setRemedy("Apply neem oil solution to affected areas. Ensure proper watering and sunlight. Remove infected parts of the plant.")
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error)
      alert('There was a problem with the upload. Check the console for more details.')
    }
  }

  return (
    <div className="container">
      <Chatbot />
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Plant Disease Classifier</h2>
          <p className="card-description">Upload an image to identify plant diseases</p>
        </div>
        <div className="card-content">
          <div className="select-container">
            <button
              className="select-button"
              onClick={() => setIsSelectOpen(!isSelectOpen)}
              aria-haspopup="listbox"
              aria-expanded={isSelectOpen}
            >
              {plantType}
              <ChevronDownIcon className="select-icon" />
            </button>
            {isSelectOpen && (
              <div 
                className="select-dropdown"
                role="listbox"
              >
                {plantTypes.map((type) => (
                  <div
                    key={type}
                    className="select-option"
                    onClick={() => {
                      setPlantType(type)
                      setIsSelectOpen(false)
                    }}
                    role="option"
                    aria-selected={plantType === type}
                  >
                    {type}
                  </div>
                ))}
              </div>
            )}
          </div>
          <motion.div
            className="drop-zone"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => document.getElementById('fileInput').click()}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {imagePreview ? (
              <img src={imagePreview} alt="Selected file" className="preview-image" />
            ) : (
              <div className="upload-prompt">
                <UploadIcon className="upload-icon" />
                <p>Drag & Drop or Click to Upload Image</p>
              </div>
            )}
            <input
              type="file"
              id="fileInput"
              className="hidden-input"
              onChange={handleFileChange}
              accept="image/*"
            />
          </motion.div>
          <button 
            onClick={uploadImage}
            className="upload-button"
          >
            Check Now
          </button>
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="result-container"
            >
              <h3 className="result-title">Result:</h3>
              <p>{result}</p>
            </motion.div>
          )}
          {remedy && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="remedy-container"
            >
              <h3 className="remedy-title">Remedy:</h3>
              <p>{remedy}</p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}