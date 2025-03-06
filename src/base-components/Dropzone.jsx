import React, { useEffect, useState } from 'react'
import { ImageUp, X } from 'lucide-react'

const Dropzone = ({ onFileSelect, showError }) => {
  const [selectedFile, setSelectedFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(null)
  const [dragActive, setDragActive] = useState(false)
  const [isError, setIsError] = useState(showError)

  useEffect(() => {
    setIsError(showError)
  }, [showError])

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
        setSelectedFile(file)
        setPreviewUrl(URL.createObjectURL(file))
        setIsError(false)
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
        setIsError(false)
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

  const removeFile = (e) => {
    e.preventDefault()
    setSelectedFile(null)
    setPreviewUrl(null)
    onFileSelect(null)
  }

  return (
    <>
      <div
        className={`
          w-80 h-80 rounded-xl bg-white border-2 border-dashed flex justify-center items-center overflow-hidden transition relative group cursor-pointer
          ${dragActive && 'border-primary border-4'}
          ${isError ?  'border-red-500 bg-red-300 hover:border-4 hover:border-primary hover:bg-white' : !previewUrl && 'hover:border-primary hover:border-4'}
          ${previewUrl && 'border-2'}
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {previewUrl ? (
          <div className='w-full h-full flex justify-center items-center relative cursor-pointer'>
            <img src={previewUrl} alt='Preview' className='w-[150%] h-[150%] object-cover blur-sm absolute' />
            <img src={previewUrl} alt='Preview' className='w-full h-full object-contain rounded-xl z-10' />
            <div className='absolute inset-0 group-hover:bg-primary/20 transition z-10 flex justify-end'>
              <div className='size-10 flex items-end'>
                <button onClick={removeFile} className='p-1 bg-white rounded-full shadow hover:bg-red-500 transition'>
                  <X size={20} />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <label
            htmlFor='dropzone' 
            className={`w-full h-full group-hover:bg-primary/20 flex flex-col justify-center items-center gap-4 text-gray-400 transition cursor-pointer ${dragActive && 'bg-primary/20'} ${isError && 'text-red-500'}`}>
            <div className='mt-10 flex justify-center items-center transition group-hover:text-secondary'>
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
