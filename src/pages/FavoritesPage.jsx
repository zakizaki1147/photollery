import React from 'react'
import { NavigationBar } from '../components/NavigationBar'

export const FavoritesPage = () => {
  return (
    <>
      <div className='w-full fixed top-0 z-10'>
        <NavigationBar />
      </div>
      <div className='mt-20'>
        Favorites Page
      </div>
    </>
  )
}
