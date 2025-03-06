import React, { useState, useEffect } from 'react'
import { TextForm, PasswordForm } from '../base-components/InputForms'
import { ButtonSecondary } from '../base-components/Buttons'
import { Link, useNavigate } from 'react-router-dom'
import PhotolleryText from '../assets/photolleryText.png'
import { DangerAlert, SuccessAlert } from '../base-components/Alerts'
import axios from 'axios'

export const LoginPage = () => {
  const [userData, setUserData] = useState({ username: '', password: '' })
  const [errors, setErrors] = useState({})
  const [successMessage, setSuccessMessage] = useState('')
  const [dangerMessage, setDangerMessage] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const successLogoutMessage = localStorage.getItem('successLogout')
    if (successLogoutMessage) {
      setSuccessMessage(successLogoutMessage)
      localStorage.removeItem('successLogout')
    }
  }, [])

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    })

    setErrors({
      ...errors,
      [e.target.name]: '',
    })
  }

  const handleLogin = async (e) => {
    e.preventDefault()

    const newErrors = {};
    Object.keys(userData).forEach((key) => {
      if (!userData[key]) {
        newErrors[key] = 'Please fill this field!'
      }
    })

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    try {
      const response = await axios.post('http://localhost:5000/api/login', userData, {
        headers: { 'Content-Type': 'application/json' },
      })

      console.log("Login response:", response.data)
  
      localStorage.setItem("token", response.data.token)
      localStorage.setItem("successLogin", "Log in success! Welcome to Photollery!")
      navigate("/");
    } catch (err) {
      console.error("Login error:", err)
  
      if (err.response && err.response.status === 401) {
        setDangerMessage("Invalid username or password!")
      } else {
        setDangerMessage("Failed to connect to server!")
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
            onSubmit={handleLogin}
            className='w-[30rem] h-[30rem] bg-white rounded-3xl flex flex-col justify-center items-center p-10 pt-20 gap-10'
          >
            <p className='text-3xl font-semibold text-secondary'>Log In</p>
            <div className='w-full flex flex-col gap-5'>
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
                <PasswordForm
                  placeholder='Password'
                  id='password'
                  value={userData.password}
                  onChange={handleChange}
                  error={errors.password}
                >Password</PasswordForm>
              </div>
            </div>
            <ButtonSecondary type='submit'>Log In</ButtonSecondary>
            <p className='text-xs'>
              Don't have an account?
              <Link to='/register' className='ml-1 text-secondary hover:underline transition'>Register</Link>
            </p>
          </form>
        </div>
      </div>
      <div className='fixed bottom-4 right-4 flex flex-col gap-1'>
        {successMessage && <SuccessAlert message={successMessage} onClose={() => setSuccessMessage('')} />}
        {dangerMessage && <DangerAlert message={dangerMessage} onClose={() => setDangerMessage('')} />}
      </div>
    </>
  )
}
