import React from 'react'
import { ButtonPrimary, ButtonSecondary, ButtonPrimaryOutline, ButtonSecondaryOutline } from '../base-components/Buttons'
import { Heart, Bookmark, Plus } from 'lucide-react'
import { Link } from 'react-router-dom'
import PhotolleryText from '../assets/photolleryText.png'

export const NavigationBar = () => {
  return (
    <>
      <div className='w-full h-16 bg-gradient-to-tr from-secondary to-primary'>
        <div className='w-full h-full px-12 flex justify-between items-center'>
          <Link to='/'>
            <div className='w-52'>
              <img src={PhotolleryText} alt="Photollery" />
            </div>
          </Link>
          <div className='hidden justify-center items-center gap-2'>
            <Link to='/register'>
              <ButtonSecondaryOutline>Sign In</ButtonSecondaryOutline>
            </Link>
            <p className='font-sans select-none'>I</p>
            <Link to='/login'>
              <ButtonSecondary>Log In</ButtonSecondary>
            </Link>
          </div>
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
            <p className='font-sans select-none'>I</p>
            <Link to='/login'>
              <ButtonSecondary>Log Out</ButtonSecondary>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
