import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { NavigationBar } from '../components/NavigationBar'
import { ArrayImage } from '../base-components/Images'
import { DetailPhotoPopup } from '../components/DetailPhotoPopup'
import axios from 'axios'
import { ChevronLeft } from 'lucide-react'

export const DetailAlbumPage = () => {
  const { albumID } = useParams()
  const [spans, setSpans] = useState({})
  const [albumPhotos, setAlbumPhotos] = useState([])
  const [openDetailPhotoPopup, setOpenDetailPhotoPopup] = useState(false)
  const [selectedPhotoID, setSelectedPhotoID] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate('/error')
    }
    const fetchAlbum = async () => {
      try {
        const token = localStorage.getItem('token')
        const response = await axios.get('http://localhost:5000/api/albums', {
          headers: { Authorization: `Bearer ${token}` }
        })
        const filteredAlbum = response.data.filter(album => album.AlbumID === parseInt(albumID))
        setAlbumPhotos(filteredAlbum)
      } catch (error) {
        console.error('Error fetching photos:', error)
      }
    }
    fetchAlbum()
  }, [navigate, albumID])
  
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
      <div className='w-full fixed top-0 z-20'>
        <NavigationBar />
      </div>
      <div className='mt-20 m-4'>
        <div className='mb-4 ml-2 text-center relative'>
          <div className='absolute'>
            <Link to='/albums'>
              <button className='bg-primary p-3 rounded-full hover:bg-secondary transition'>
                <ChevronLeft size={20} />
              </button>
            </Link>
          </div>
          {albumPhotos.length > 0 && (
            <>
              <p className='text-xl text-secondary font-bold underline underline-offset-8 mb-2'>{albumPhotos[0].NamaAlbum}</p>
              <p>{albumPhotos[0].Deskripsi}</p>
              <p className='text-gray-400 font-bold text-sm'>by @{albumPhotos[0].Username}</p>
            </>
          )}
        </div>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3'>
          {albumPhotos.flatMap(album => album.photos).map(photo => (
            <ArrayImage key={photo.FotoID} photo={photo} onImageLoad={onImageLoad} spans={spans} onClick={toggleDetailPhotoPopup} />
          ))}
          {openDetailPhotoPopup && (
            <DetailPhotoPopup fotoID={selectedPhotoID} open={openDetailPhotoPopup} onClose={() => setOpenDetailPhotoPopup(false)} />
          )}
        </div>
      </div>
    </>
  )
}
