import React from 'react'
import { NavigationBar } from '../components/NavigationBar'
import { Frown } from 'lucide-react'
import { ButtonSecondary } from '../base-components/Buttons'
import { Link } from 'react-router-dom'

export const FavoritesPage = () => {
  return (
    <>
      <div className='w-full fixed top-0 z-10'>
        <NavigationBar />
      </div>
      <div className='w-full mt-72 flex flex-col justify-center items-center gap-5'>
        <p>You don't have any favorite photos yet.</p>
        <Frown size={50} strokeWidth={2} />
        <div className='flex justify-center items-center gap-2'>
          <p>Favorite a photo now!</p>
          <Link to='/'>
            <ButtonSecondary>Back to Home</ButtonSecondary>
          </Link>
        </div>
      </div>
    </>
  )
}
