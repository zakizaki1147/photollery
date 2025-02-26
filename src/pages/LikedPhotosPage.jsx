import React, { useState, useEffect } from 'react'
import { NavigationBar } from '../components/NavigationBar'
import { Frown } from 'lucide-react'
import { ButtonSecondary } from '../base-components/Buttons'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { ArrayImage } from '../base-components/Images'
import { DetailPhotoPopup } from '../components/DetailPhotoPopup'

export const LikedPhotosPage = () => {
  const [spans, setSpans] = useState({})
  const [likedPhotos, setLikedPhotos] = useState([])
  const [openDetailPhotoPopup, setOpenDetailPhotoPopup] = useState(false)
  const [selectedPhotoID, setSelectedPhotoID] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate('/error')
    }
    const fetchLikedPhotos = async () => {
      try {
        const token = localStorage.getItem('token')
        const response = await axios.get('http://localhost:5000/api/liked-photos', {
          headers: { Authorization: `Bearer ${token}` }
        })
        setLikedPhotos(response.data.likedPhotos)
      } catch (error) {
        console.error('Error fetching liked photos:', error)
      }
    }
    fetchLikedPhotos()
  }, [navigate])

  const handleUnlike = (fotoID) => {
    setLikedPhotos((prev) => prev.filter((photo) => photo.FotoID !== fotoID))
  }
  
  const toggleDetailPhotoPopup = (fotoID) => {
    setSelectedPhotoID(fotoID)
    setOpenDetailPhotoPopup(true)
  }

  const onImageLoad = (event, id) => {
    const img = event.target
    const imgHeight = img.naturalHeight
    const imgWidth = img.naturalWidth
    const rowSpan = Math.ceil((imgHeight / imgWidth * 10) / 10)
    setSpans(prev => ({ ...prev, [id]: rowSpan }))
  }

  return (
    <>
      <div className='w-full fixed top-0 z-10'>
        <NavigationBar />
      </div>
      {likedPhotos.length > 0 ? (
        <div className='mt-20 m-4'>
          <div className='mb-4 ml-2'>
            <p className='text-xl text-center underline underline-offset-8'>Liked Photos by <span className='font-bold'>@{likedPhotos[0].Username}</span></p>
          </div>
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3'>
            {likedPhotos.map(photo => (
              <ArrayImage key={photo.FotoID} photo={photo} onImageLoad={onImageLoad} spans={spans} onClick={toggleDetailPhotoPopup} />
            ))}
            {openDetailPhotoPopup && (
              <DetailPhotoPopup fotoID={selectedPhotoID} open={openDetailPhotoPopup} onClose={() => setOpenDetailPhotoPopup(false)} onUnlike={handleUnlike} />
            )}
          </div>
        </div>
      ) : (
        <div className='w-full h-screen flex flex-col justify-center items-center gap-5'>
          <p>You don't have any liked photos yet.</p>
          <Frown size={50} strokeWidth={2} />
          <div className='flex justify-center items-center gap-2'>
            <p>Like a photo now!</p>
            <Link to='/'>
              <ButtonSecondary>Back to Home</ButtonSecondary>
            </Link>
          </div>
        </div>
      )}
    </>
  )
}
