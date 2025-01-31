import React, { useState } from 'react'
import { TextForm, PasswordForm } from '../base-components/InputForms'
import { ButtonSecondary, ButtonSecondaryOutline } from '../base-components/Buttons'
import { Link } from 'react-router-dom'
import PhotolleryText from '../assets/photolleryText.png'
import axios from 'axios'

export const RegisterPage = () => {
  const [userData, setUserData] = useState({
    namaLengkap: '',
    alamat: '',
    username: '',
    email: '',
    password: '',
  })

  const handleChange = (e) => {
    setUserData({ 
      ...userData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('http://localhost:5000/api/users', userData)
      console.log('User successfully registered!', response.data)
      setUserData({
        namaLengkap: '',
        alamat: '',
        username: '',
        email: '',
        password: '',
      })
      alert('User successfully registered!')
    } catch (error) {
      console.error('Error encountered:', error.response?.data || error.message);
      alert('Failed to register user.')
    }
  }
  
  return (
    <>
      <div className='w-full h-screen bg-gradient-to-tr from-secondary to-primary flex'>
        <div className='w-1/2 h-screen flex justify-center items-center'>
          <div className='w-[35rem]'>
            <img src={PhotolleryText} alt="Photollery" />
          </div>
        </div>
        <div className='w-1/2 h-screen flex justify-center items-center'>
          <form
            onSubmit={handleSubmit}
            className='w-[30rem] min-h-[30rem] bg-white rounded-3xl flex flex-col justify-center items-center p-10 gap-10'
          >
            <p className='text-3xl font-semibold text-secondary'>Register</p>
            <div className='w-full flex flex-col gap-3'>
              <div className='w-full'>
                <label 
                  htmlFor="namaLengkap"
                  className='font-medium text-sm text-secondary'
                >Full Name</label>
                <TextForm
                  placeholder='Full Name'
                  id='namaLengkap'
                  value={userData.namaLengkap}
                  onChange={handleChange}
                />
              </div>
              <div className='w-full'>
                <label 
                  htmlFor="alamat"
                  className='font-medium text-sm text-secondary'
                >Address</label>
                <TextForm
                  placeholder='Address'
                  id='alamat'
                  value={userData.alamat}
                  onChange={handleChange}
                />
              </div>
              <div className='w-full'>
                <label 
                  htmlFor="username"
                  className='font-medium text-sm text-secondary'
                >Username</label>
                <TextForm
                  placeholder='Username'
                  id='username'
                  value={userData.username}
                  onChange={handleChange}
                />
              </div>
              <div className='w-full'>
                <label 
                  htmlFor="email"
                  className='font-medium text-sm text-secondary'
                >Email</label>
                <TextForm
                  placeholder='Email'
                  id='email'
                  value={userData.email}
                  onChange={handleChange}
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
                  value={userData.password}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className='w-full flex justify-center items-center gap-24'>
              <Link to='/login'>
                <ButtonSecondaryOutline>Back to Log In</ButtonSecondaryOutline>
              </Link>
              <ButtonSecondary type='submit'>Sign Up</ButtonSecondary>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
