import React from 'react'
import { TextForm, PasswordForm } from '../base-components/InputForms'
import { ButtonSecondary } from '../base-components/Buttons'
import { Link } from 'react-router-dom'
import PhotolleryText from '../assets/photolleryText.png'

export const LoginPage = () => {
  return (
    <>
      <div className='w-full h-screen bg-gradient-to-tr from-secondary to-primary flex'>
        <div className='w-1/2 h-screen flex justify-center items-center'>
          <div className='w-[35rem]'>
            <img src={PhotolleryText} alt="Photollery" />
          </div>
        </div>
        <div className='w-1/2 h-screen flex justify-center items-center'>
          <div className='w-[30rem] h-[30rem] bg-white rounded-3xl flex flex-col justify-center items-center p-10 pt-20 gap-10'>
            <p className='text-3xl font-semibold text-secondary'>Log In</p>
            <div className='w-full flex flex-col gap-5'>
              <div className='w-full'>
                <label 
                  htmlFor="email"
                  className='font-medium text-sm text-secondary'
                >Email</label>
                <TextForm
                  placeholder='Email'
                  id='email'
                />
              </div>
              <div className='w-full'>
                <label
                  htmlFor="password"
                  className='font-medium text-sm text-secondary'
                >Password</label>
                <PasswordForm
                  placeholder='Password'
                  id='password'
                />
              </div>
            </div>
            <Link to='/'>
              <ButtonSecondary>Log In</ButtonSecondary>
            </Link>
            <p className='text-xs'>
              Don't have an account?
              <Link to='/register' className='ml-1 text-secondary hover:underline transition'>Register</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
