import React, { useEffect, useState } from 'react'
import { NavigationBar } from '../components/NavigationBar'
import { AlbumCollage } from '../base-components/Images'
import { ButtonNewAlbum } from '../base-components/Buttons'
import { AddAlbumPopup } from '../components/AddAlbumPopup'
import axios from 'axios'


export const AlbumsPage = () => {
  const [openAddAlbumPopup, setOpenAddAlbumPopup] = useState(false)
  const [albums, setAlbums] = useState([])

  const toggleAddAlbumPopup = () => {
    setOpenAddAlbumPopup((prev) => !prev)
  }

  useEffect(() => {
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
  }, [])

  return (
    <>
      <div className='w-full fixed top-0'>
        <NavigationBar />
      </div>
      {albums.length > 0 ? (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 mt-20 m-4'>
          {albums.map((album) => (
            <AlbumCollage key={album.AlbumID} album={album} />
          ))}
          <ButtonNewAlbum onClick={toggleAddAlbumPopup} />
          <AddAlbumPopup open={openAddAlbumPopup} onClose={() => setOpenAddAlbumPopup(false)} />
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
