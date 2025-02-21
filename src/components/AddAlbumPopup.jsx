import React, { useEffect, useState } from 'react'
import ReactDom from 'react-dom'
import { useBodyOverflow } from '../custom-hooks/useBodyOverflow'
import { TextArea, TextForm } from '../base-components/InputForms'
import { ButtonSecondary, ButtonSecondaryOutline } from '../base-components/Buttons'
import axios from 'axios'

export const AddAlbumPopup = ({ open, onClose }) => {
  const [namaAlbum, setNamaAlbum] = useState("")
  const [deskripsi, setDeskripsi] = useState("")
  const [errors, setErrors] = useState("")
  const [isVisible, setIsVisible] = useState(false)

  useBodyOverflow(open)

  useEffect(() => {
    if (open) {
      setIsVisible(true);
    } else {
      setTimeout(() => {
      setIsVisible(false);
        onClose();
      }, );
    }
    
  }, [open, onClose]);
  
  const handleClose = () => {
    setTimeout(() => {
      onClose()
    }, )
  }
  
  if (!open && !isVisible) return null

  const handleSubmit = async (e) => {
    e.preventDefault()

    const token = localStorage.getItem("token")
    const namaAlbum = document.getElementById("namaAlbum").value;
    const deskripsi = document.getElementById("deskripsi").value;

    if (!namaAlbum) {
      setErrors("Please fill this field!")
      return
    }

    if (!token) {
      alert("Unauthorized! Please login again!")
      return
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/add_album",
        { namaAlbum, deskripsi },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      alert(response.data.message)
      onClose()
    } catch (error) {
      console.error("Error adding album:", error)
      alert(error.response?.data?.message || "Failed to add album!")
    }
  }
  
  return ReactDom.createPortal (
    <>
      <div className='fixed inset-0 bg-black/50' onClick={handleClose}></div>
      <div className='w-full h-screen fixed inset-0' onClick={handleClose}>
        <div className='w-full h-screen relative flex justify-center items-center'>
          <div
            className='h-fit flex justify-center items-center gap-5 p-5 bg-gradient-to-tr from-secondary to-primary rounded-2xl'
            onClick={(e) => e.stopPropagation()}
          >
            <form onSubmit={handleSubmit} className='w-[30rem] h-full bg-white p-5 rounded-xl'>
              <div className='flex flex-col justify-center items-center gap-3'>
                <p className='text-center font-medium text-lg text-secondary py-3'>Create new album.</p>
                <div className='w-full'>
                  <TextForm
                    placeholder='Album Name'
                    id='namaAlbum'
                    value={namaAlbum}
                    onChange={(e) => setNamaAlbum(e.target.value)}
                    error={errors}
                  >Album Name</TextForm>
                </div>
                <div className='w-full'>
                  <TextArea
                    placeholder='Album Description (Optional)'
                    id='deskripsi'
                    value={deskripsi}
                    onChange={(e) => setDeskripsi(e.target.value)}
                  >Album Description</TextArea>
                </div>
              </div>
              <div className='flex justify-between items-center gap-5 mt-10'>
                <div className='w-1/2'>
                  <ButtonSecondaryOutline onClick={handleClose} type='button'>Cancel</ButtonSecondaryOutline>
                </div>
                <div className='w-1/2'>
                  <ButtonSecondary type='submit'>Create</ButtonSecondary>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>,
    document.getElementById('portal')
  )
}
