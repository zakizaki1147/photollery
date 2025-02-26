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

  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    setUserData({ 
      ...userData,
      [e.target.name]: e.target.value,
    })
    setErrors({
      ...errors,
      [e.target.name]: ''
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    let newErrors = {};
    Object.keys(userData).forEach((key) => {
      if (!userData[key]) {
          newErrors[key] = 'Please fill this field!';
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/register', userData);
      console.log('User successfully registered!', response.data);
      setUserData({
          namaLengkap: '',
          alamat: '',
          username: '',
          email: '',
          password: '',
      });
      setErrors({});
      alert('User successfully registered!');
    } catch (error) {
      console.error('Error encountered:', error.response?.data || error.message);

      if (error.response && error.response.status === 400 && error.response.data.message === 'Email already registered!') {
        alert('Email is already registered. Please use a different email.');
      } else {
        alert('Failed to register user.');
      }
    }
  };

  
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
                <TextForm
                  placeholder='Full Name'
                  id='namaLengkap'
                  value={userData.namaLengkap}
                  onChange={handleChange}
                  error={errors.namaLengkap}
                >Full Name</TextForm>
              </div>
              <div className='w-full'>
                <TextForm
                  placeholder='Address'
                  id='alamat'
                  value={userData.alamat}
                  onChange={handleChange}
                  error={errors.alamat}
                >Address</TextForm>
              </div>
              <div className='w-full'>
                <TextForm
                  placeholder='Username'
                  id='username'
                  value={userData.username}
                  onChange={handleChange}
                  error={errors.username}
                >Username</TextForm>
              </div>
              <div className='w-full'>
                <TextForm
                  placeholder='Email'
                  id='email'
                  value={userData.email}
                  onChange={handleChange}
                  error={errors.email}
                >Email</TextForm>
              </div>
              <div className='w-full'>
                <PasswordForm
                  placeholder='Password'
                  id='password'
                  value={userData.password}
                  onChange={handleChange}
                  error={errors.password}
                >Password</PasswordForm>
              </div>
            </div>
            <div className='w-full flex justify-center items-center gap-5'>
              <Link to='/login' className='w-1/2'>
                <ButtonSecondaryOutline>Back to Log In</ButtonSecondaryOutline>
              </Link>
              <div className='w-1/2'>
                <ButtonSecondary type='submit'>Sign Up</ButtonSecondary>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
