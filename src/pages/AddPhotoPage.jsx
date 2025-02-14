import React, { useEffect, useState } from 'react'
import { NavigationBar } from '../components/NavigationBar'
import { ImageUp } from 'lucide-react'
import { TextForm, Dropdown, TextArea } from '../base-components/InputForms'
import { ButtonSecondary, ButtonSecondaryOutline } from '../base-components/Buttons'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

export const AddPhotoPage = () => {
  const [album, setAlbum] = useState("")
  const [albumList, setAlbumList] = useState([{ value: "", label: "No album available." }])
  const [judulFoto, setJudulFoto] = useState("")
  const [deskripsiFoto, setDeskripsiFoto] = useState("")
  const [foto, setFoto] = useState(null)
  const [errors, setErrors] = useState("")
  const navigate = useNavigate()

  useEffect (() => {
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
        setAlbumList([{ value: "", label: "Photo Album" }, ...formattedAlbums])
      } catch (error) {
        console.error('Error fetching data albums:', error)
      }
    }
    fetchAlbums()
  }, [])

  const handleDropdownChange = (e) => {
    setAlbum(e.target.value)
  }

  const handleFileChange = (e) => {
    setFoto(e.target.files[0])
  }

  const handleUpload = async (e) => {
    e.preventDefault()

    if (!judulFoto || !foto) {
      setErrors("Please fill the title and image form!")
      return
    }

    const formData = new FormData()
    formData.append("judulFoto", judulFoto)
    formData.append("deskripsiFoto", deskripsiFoto)
    formData.append("albumID", album || null)
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
      navigate("/")
    } catch (err) {
      console.error("Upload failed:", err)
      setErrors("Failed to upload photo!")
    }
  }

  return (
    <>
      <div className='w-full fixed top-0 z-10'>
        <NavigationBar />
      </div>
      <div className='w-full h-screen flex justify-center items-center'>
        <form onSubmit={handleUpload} className='h-fit flex justify-center items-center gap-5 p-5 bg-gradient-to-tr from-secondary to-primary rounded-2xl'>
          <div className='w-80 h-fit flex flex-col gap-4'>
            <div className='h-80 rounded-xl bg-white border-2 hover:border-4 hover:border-primary border-dashed flex justify-center items-center transition group'>
              <label htmlFor="dropzone" className='w-full h-full hover:bg-primary/20 flex flex-col justify-center items-center gap-4 cursor-pointer'>
                <div className='text-gray-400 group-hover:text-secondary rounded-lg p-1 mt-10 flex justify-center items-center transition'>
                  <ImageUp size={40} />
                </div>
                <p className='text-center text-sm leading-tight text-gray-400 group-hover:text-secondary select-none transition'>
                  Choose your image <br /> or upload it here.
                </p>
              </label>
              <input type="file" id='dropzone' className='hidden' onChange={handleFileChange} />
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
              <p className='text-center font-medium text-lg text-secondary py-3'>Upload new photo.</p>
              <div className='w-full'>
                <TextForm
                  placeholder='Photo Title'
                  id='judulFoto'
                  value={judulFoto}
                  onChange={(e) => setJudulFoto(e.target.value)}
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
            <div className='flex flex-1 justify-between items-end'>
              <Link to='/'>
                <ButtonSecondaryOutline>Cancel</ButtonSecondaryOutline>
              </Link>
              <ButtonSecondary type="submit">Upload</ButtonSecondary>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}
