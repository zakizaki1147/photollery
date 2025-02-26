import React from 'react'
import { ButtonSecondary, ButtonSecondaryOutline } from '../base-components/Buttons'
import { Link } from 'react-router-dom'
import { CircleAlert } from 'lucide-react'

export const ErrorPage = () => {
  return (
    <>
      <div className='w-full h-screen bg-gradient-to-tr from-secondary to-primary flex justify-center items-center'>
        <div className='bg-white p-10 gap-5 flex flex-col justify-center items-center rounded-3xl'>
          <p>Error: 401 (Unauthorized)</p>
          <CircleAlert size={50} strokeWidth={2} className='text-red-500' />
          <p>Please proceed to Log In to continue.</p>
          <div className='w-full flex gap-5'>
            <Link to='/' className='w-1/2'>
              <ButtonSecondaryOutline>Back to Home</ButtonSecondaryOutline>
            </Link>
            <Link to='/login' className='w-1/2'>
              <ButtonSecondary>Log In</ButtonSecondary>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
