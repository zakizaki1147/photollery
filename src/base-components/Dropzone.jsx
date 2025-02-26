import React, { useState } from 'react'
import { ImageUp, X } from 'lucide-react'

const Dropzone = ({ onFileSelect }) => {
  const [selectedFile, setSelectedFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(null)
  const [dragActive, setDragActive] = useState(false)

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
        setSelectedFile(file)
        setPreviewUrl(URL.createObjectURL(file))
        onFileSelect(file)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragActive(false)

    const file = e.dataTransfer.files[0]
    if (file) {
        setSelectedFile(file)
        setPreviewUrl(URL.createObjectURL(file))
        onFileSelect(file)
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    setDragActive(true)
  }

  const handleDragLeave = () => {
    setDragActive(false)
  }

  const removeFile = () => {
    setSelectedFile(null)
    setPreviewUrl(null)
    onFileSelect(null)
  }

  return (
    <>
    <div
      className={`w-80 h-80 rounded-xl bg-white border-2 border-dashed flex justify-center items-center transition relative ${dragActive ? 'border-primary border-4' : 'border-gray-300 hover:border-primary hover:border-4'}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {previewUrl ? (
        <div className='w-full h-full flex justify-center items-center relative'>
          <img src={previewUrl} alt='Preview' className='w-full h-full object-cover rounded-xl' />
          <button onClick={removeFile} className='absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-red-500 hover:text-white transition'>
            <X size={20} />
          </button>
        </div>
      ) : (
        <label htmlFor='dropzone' className='w-full h-full flex flex-col justify-center items-center gap-4 cursor-pointer text-gray-400 group'>
          <div className='rounded-lg p-1 flex justify-center items-center transition group-hover:text-secondary'>
            <ImageUp size={40} />
          </div>
          <p className='text-center text-sm leading-tight group-hover:text-secondary select-none transition'>
            Choose your image <br /> or upload it here.
          </p>
          <input type='file' id='dropzone' className='hidden' onChange={handleFileChange} accept='image/*' />
        </label>
      )}
    </div>
    </>
  )
}

export { Dropzone }
