import React, { useEffect, useState } from 'react'
import { NavigationBar } from '../components/NavigationBar'
import { Dropzone } from '../base-components/Dropzone'
import { TextForm, Dropdown, TextArea } from '../base-components/InputForms'
import { ButtonSecondary, ButtonSecondaryOutline } from '../base-components/Buttons'
import { Link, useNavigate } from 'react-router-dom'
import { DangerAlert, SuccessAlert } from '../base-components/Alerts'
import axios from 'axios'

export const UploadPhotoPage = () => {
  const [album, setAlbum] = useState("")
  const [albumList, setAlbumList] = useState([{ value: "", label: "No album available." }])
  const [judulFoto, setJudulFoto] = useState("")
  const [deskripsiFoto, setDeskripsiFoto] = useState("")
  const [foto, setFoto] = useState(null)
  const [errors, setErrors] = useState({})
  const [showError, setShowError] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [dangerMessage, setDangerMessage] = useState('')
  const navigate = useNavigate()

  useEffect (() => {
    if (!localStorage.getItem("token")) {
      navigate('/error')
    }
    const fetchAlbums = async () => {
      try {
        const token = localStorage.getItem('token')
        const response = await axios.get('http://localhost:5000/api/albums?simple=true', {
          headers: { Authorization: `Bearer ${token}` }
        })
        const formattedAlbums = response.data.map((albumItem) => ({
          value: albumItem.AlbumID,
          label: albumItem.NamaAlbum,
        }))
        setAlbumList([{ value: "", label: "No selected album" }, ...formattedAlbums])
      } catch (error) {
        console.error('Error fetching data albums:', error)
      }
    }
    fetchAlbums()
  }, [navigate])

  const handleDropdownChange = (e) => {
    setAlbum(e.target.value)
  }

  const handleFileSelect = (file) => {
    setFoto(file)
  }

  const handleUpload = async (e) => {
    e.preventDefault()

    const newErrors = {}

    if (!judulFoto) {
      newErrors.judulFoto = "Please fill this field!"
    }

    if (!foto) {
      newErrors.foto = "Please upload a photo!"
      setShowError(true)
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setShowError(false)

    const formData = new FormData()
    formData.append("judulFoto", judulFoto)
    formData.append("deskripsiFoto", deskripsiFoto)
    formData.append("albumID", album ? album : "")
    formData.append("foto", foto)

    try {
      const token = localStorage.getItem('token')
      const response = await axios.post("http://localhost:5000/api/upload_photo", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`
        }
      })
      console.log("Upload success:", response.data)
      localStorage.setItem('successUploadPhoto', 'Photo uploaded successfully!')
      navigate("/")
    } catch (err) {
      console.error("Upload failed:", err)
      setDangerMessage("Failed to upload photo!")
    }
  }

  return (
    <>
      <div className='w-full fixed top-0 z-10'>
        <NavigationBar />
      </div>
      <div className='mt-[5.5rem] m-4'>
        <div className='mb-7'>
          <p className='text-xl text-center text-secondary font-medium underline underline-offset-8'>Upload New Photo</p>
        </div>
        <form onSubmit={handleUpload} className='w-fit h-fit m-auto flex justify-center items-center gap-5 p-5 bg-gradient-to-tr from-secondary to-primary rounded-2xl'>
          <div className='w-80 h-fit flex flex-col gap-4'>
            <div>
              <Dropzone onFileSelect={handleFileSelect} showError={showError} />
            </div>
            <div className='rounded-xl bg-white p-3'>
              <p className='font-medium mb-2 text-secondary'>Notes:</p>
              <ul className='text-sm flex flex-col gap-1'>
                <li className='flex items-center'>
                  <div className='bg-secondary rounded-full size-1.5'></div>
                  <p className='ml-2 leading-none'>Supported formats: .jpg, .jpeg, .png</p>
                </li>
                <li className='flex items-center'>
                  <div className='bg-secondary rounded-full size-1.5'></div>
                  <p className='ml-2'>Max file size: 10mb</p>
                </li>
              </ul>
            </div>
          </div>
          <div className='w-[30rem] h-[444px] flex flex-col rounded-xl p-5 bg-white'>
            <div className='flex flex-col justify-center gap-3 h-[320px]'>
              <p className='text-center font-medium text-lg text-secondary py-3'>Fill the columns.</p>
              <div className='w-full'>
                <TextForm
                  placeholder='Photo Title'
                  id='judulFoto'
                  value={judulFoto}
                  onChange={(e) => {
                    setJudulFoto(e.target.value)
                    setErrors({ ...errors, judulFoto: "" })
                  }}
                  error={errors.judulFoto}
                >Photo Title</TextForm>
              </div>
              <div>
                <TextArea 
                  placeholder='Photo Description (Optional)'
                  id='deskripsiFoto'
                  value={deskripsiFoto}
                  onChange={(e) => setDeskripsiFoto(e.target.value)}
                >Photo Description</TextArea>
              </div>
              <div>
                <Dropdown
                  id='albumFoto'
                  options={albumList}
                  value={album}
                  onChange={handleDropdownChange}
                >Photo Album</Dropdown>
              </div>
            </div>
            <div className='flex flex-1 justify-between items-end gap-5'>
              <div className='w-1/2'>
                <Link to='/'>
                  <ButtonSecondaryOutline>Cancel</ButtonSecondaryOutline>
                </Link>
              </div>
              <div className='w-1/2'>
                <ButtonSecondary type="submit">Upload</ButtonSecondary>
              </div>
            </div>
          </div>
        </form>
      </div>
      <div className='fixed bottom-4 right-4 flex flex-col gap-1'>
        {successMessage && <SuccessAlert message={successMessage} onClose={() => setSuccessMessage('')} />}
        {dangerMessage && <DangerAlert message={dangerMessage} onClose={() => setDangerMessage('')} />}
      </div>
    </>
  )
}
