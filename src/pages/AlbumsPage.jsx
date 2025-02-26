import React, { useEffect, useState } from 'react'
import { NavigationBar } from '../components/NavigationBar'
import { AlbumCollage } from '../base-components/Images'
import { ButtonNewAlbum } from '../base-components/Buttons'
import { AddAlbumPopup } from '../components/AddAlbumPopup'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


export const AlbumsPage = () => {
  const [openAddAlbumPopup, setOpenAddAlbumPopup] = useState(false)
  const [albums, setAlbums] = useState([])
  const navigate = useNavigate()

  const toggleAddAlbumPopup = () => {
    setOpenAddAlbumPopup((prev) => !prev)
  }

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
        setAlbums(response.data)
      } catch (error) {
        console.error('Error fetching albums:', error)
      }
    }
    fetchAlbum()
  }, [navigate])

  return (
    <>
      <div className='w-full fixed top-0'>
        <NavigationBar />
      </div>
      {albums.length > 0 ? (
        <div className='mt-20 m-4'>
          <div className='mb-4 ml-2'>
            <p className='text-xl text-center underline underline-offset-8'>Saved Albums by <span className='font-bold'>@{albums[0].Username}</span></p>
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3'>
            {albums.map((album) => (
              <AlbumCollage key={album.AlbumID} album={album} />
            ))}
            <ButtonNewAlbum onClick={toggleAddAlbumPopup} />
            <AddAlbumPopup open={openAddAlbumPopup} onClose={() => setOpenAddAlbumPopup(false)} />
          </div>
        </div>
      ) : (
        <div className='w-full h-screen flex flex-col justify-center items-center gap-5'>
          <p>You don't have any album photos yet.</p>
          <ButtonNewAlbum onClick={toggleAddAlbumPopup} />
          <AddAlbumPopup open={openAddAlbumPopup} onClose={() => setOpenAddAlbumPopup(false)} />
        </div>
      )}
    </>
  )
}
