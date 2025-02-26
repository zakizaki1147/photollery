import React, { useEffect, useState } from 'react'
import { NavigationBar } from '../components/NavigationBar'
import { Image } from '../base-components/Images'
import { DetailPhotoPopup } from '../components/DetailPhotoPopup'
import axios from 'axios'

export const MainPage = () => {
  const [spans, setSpans] = useState({})
  const [photos, setPhotos] = useState([])
  const [openDetailPhotoPopup, setOpenDetailPhotoPopup] = useState(false)
  const [selectedPhotoID, setSelectedPhotoID] = useState(null)

  const toggleDetailPhotoPopup = (fotoID) => {
    setSelectedPhotoID(fotoID)
    setOpenDetailPhotoPopup(true)
  }

  useEffect(() => {
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
      <div className='mt-20'>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3 m-4'>
          <Image onImageLoad={onImageLoad} spans={spans} photos={photos} onClick={toggleDetailPhotoPopup} />
          {openDetailPhotoPopup && (
            <DetailPhotoPopup fotoID={selectedPhotoID} open={openDetailPhotoPopup} onClose={() => setOpenDetailPhotoPopup(false)} />
          )}
        </div>
      </div>
    </>
  )
}
