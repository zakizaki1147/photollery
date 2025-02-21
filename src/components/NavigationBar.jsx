import React, { useEffect, useState } from 'react'
import { ButtonSecondary } from '../base-components/Buttons'
import { Heart, Bookmark, Plus } from 'lucide-react'
import { Link } from 'react-router-dom'
import PhotolleryText from '../assets/photolleryText.png'
import { LogoutPopup } from './LogoutPopup'
import { jwtDecode } from 'jwt-decode'

export const NavigationBar = () => {
  const [openLogoutPopup, setOpenLogoutPopup] = useState(false)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      try {
        const decoded = jwtDecode(token)
        setUser(decoded)
      } catch (error) {
        console.error("Invalid token:", error)
        localStorage.removeItem('token')
      }
    }
  }, [])

  const toggleLogoutPopup = () => {
    setOpenLogoutPopup((prev) => !prev)
  }

  return (
    <>
      <div className='w-full h-16 bg-gradient-to-tr from-secondary to-primary'>
        <div className='w-full h-full px-12 flex justify-between items-center'>
          <Link to='/'>
            <div className='w-44'>
              <img src={PhotolleryText} alt="Photollery" />
            </div>
          </Link>
          {user ? (
            <div className='flex justify-center items-center gap-2'>
              <Link to='/addphoto'>
                <ButtonSecondary><Plus size={16} />Create</ButtonSecondary>
              </Link>
              <Link to='/favorites'>
                <ButtonSecondary><Heart size={16} />Favorites</ButtonSecondary>
              </Link>
              <Link to='/albums'>
                <ButtonSecondary><Bookmark size={16} />Albums</ButtonSecondary>
              </Link>
              <p className='font-sans text-white select-none'>I</p>
              <ButtonSecondary onClick={toggleLogoutPopup}>Log Out</ButtonSecondary>
              <LogoutPopup open={openLogoutPopup} onClose={() => setOpenLogoutPopup(false)} />
            </div>
          ) : (
            <div className='flex justify-center items-center gap-2'>
              <Link to='/login'>
                <ButtonSecondary>Log In</ButtonSecondary>
              </Link>
              <p className='font-sans text-white select-none'>I</p>
              <Link to='/register'>
                <ButtonSecondary>Sign Up</ButtonSecondary>
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
