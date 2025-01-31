import React from 'react'
import { NavigationBar } from '../components/NavigationBar'
import { MansoryLayout } from '../components/MasonryLayout'

export const MainPage = () => {
  return (
    <>
      <div className='w-full fixed top-0 z-10'>
        <NavigationBar />
      </div>
      <div className='mt-20'>
        <MansoryLayout />
      </div>
    </>
  )
}
