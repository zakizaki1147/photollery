import React, { useEffect, useState } from 'react'
import { NavigationBar } from '../components/NavigationBar'
import { Image } from '../base-components/Images'
import { DetailPhotoPopup } from '../components/DetailPhotoPopup'
import axios from 'axios'
import { DangerAlert, SuccessAlert } from '../base-components/Alerts'
import PhotolleryText from '../assets/photolleryText.png'
import { Link } from 'react-router-dom'

export const MainPage = () => {
  const [spans, setSpans] = useState({})
  const [photos, setPhotos] = useState([])
  const [successMessage, setSuccessMessage] = useState('')
  const [dangerMessage, setDangerMessage] = useState('')
  const [openDetailPhotoPopup, setOpenDetailPhotoPopup] = useState(false)
  const [selectedPhotoID, setSelectedPhotoID] = useState(null)
  
  const uploadLink = localStorage.getItem("token") ? '/upload-photo' : '/login'

  const toggleDetailPhotoPopup = (fotoID) => {
    setSelectedPhotoID(fotoID)
    setOpenDetailPhotoPopup(true)
  }

  useEffect(() => {
    const successLoginMessage = localStorage.getItem('successLogin')
    const successUploadPhotoMessage = localStorage.getItem('successUploadPhoto')
    if (successLoginMessage) {
      setSuccessMessage(successLoginMessage)
      localStorage.removeItem('successLogin')
    }
    if (successUploadPhotoMessage) {
      setSuccessMessage(successUploadPhotoMessage)
      localStorage.removeItem('successUploadPhoto')
    }
    const fetchPhotos = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/photos')
        setPhotos(response.data)
      } catch (error) {
        console.error("Error fetching photos:", error);
      }
    }
    fetchPhotos()
  }, [])

  const onImageLoad = (event, id) => {
    const img = event.target
    const imgHeight = img.naturalHeight
    const imgWidth = img.naturalWidth
    const rowSpan = Math.ceil((imgHeight / imgWidth * 10) / 10)
    setSpans(prev => ({ ...prev, [id]: rowSpan }))
  }

  return (
    <>
      <div className='w-full fixed top-0 z-20'>
        <NavigationBar />
      </div>
      <div className='mt-[5.5rem] m-4'>
        <div className='bg-gradient-to-tr from-secondary to-primary flex flex-col justify-center items-center gap-4 w-full h-40 rounded-xl mb-5 select-none'>
          <div className='flex justify-center items-center mt-4 border-b-4 border-white border-dashed'>
            <p className='text-white text-4xl font-bold ml-2 mr-4'>Welcome to</p>
            <span className='w-60 mt-0.5'><img src={PhotolleryText} alt="" /></span>
            <p className='text-white text-4xl font-bold'>!</p>
          </div>
          <p className='text-sm text-white font-medium'>See many wonderful pictures or <Link to={uploadLink} className='hover:underline underline-offset-2 transition'>upload a wonderful picture!</Link></p>
        </div>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3'>
          <Image onImageLoad={onImageLoad} spans={spans} photos={photos} onClick={toggleDetailPhotoPopup} />
          {openDetailPhotoPopup && (
            <DetailPhotoPopup fotoID={selectedPhotoID} open={openDetailPhotoPopup} onClose={() => setOpenDetailPhotoPopup(false)} />
          )}
        </div>
      </div>
      <div className='fixed bottom-4 right-4 flex flex-col gap-1'>
        {successMessage && <SuccessAlert message={successMessage} onClose={() => setSuccessMessage('')} />}
        {dangerMessage && <DangerAlert message={dangerMessage} onClose={() => setDangerMessage('')} />}
      </div>
    </>
  )
}
