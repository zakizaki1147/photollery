import React from 'react'
import { NavigationBar } from '../components/NavigationBar'
import { TextForm, TextArea } from '../base-components/InputForms'
import { ButtonSecondary, ButtonSecondaryOutline } from '../base-components/Buttons'
import { Link } from 'react-router-dom'

export const AddAlbumPage = () => {
  return (
    <>
      <div className='w-full fixed top-0 z-10'>
        <NavigationBar />
      </div>
      <div className='w-full h-screen flex justify-center items-center'>
        <form className='h-fit flex justify-center items-center gap-5 p-5 bg-gradient-to-tr from-secondary to-primary rounded-2xl'>
          <div className='w-[30rem] h-full bg-white p-5 rounded-xl'>
            <div className='flex flex-col justify-center items-center gap-3'>
              <p className='text-center font-medium text-lg text-secondary py-3'>Create new album.</p>
              <div className='w-full'>
                <TextForm
                  placeholder='Album Name'
                  id='namaAlbum'
                >Album Name</TextForm>
              </div>
              <div className='w-full'>
                <TextArea
                  placeholder='Album Description'
                  id='deskripsi'
                >Album Description</TextArea>
              </div>
            </div>
            <div className='flex justify-between items-center mt-10'>
              <Link to='/albums'>
                <ButtonSecondaryOutline>Cancel</ButtonSecondaryOutline>
              </Link>
              <ButtonSecondary>Create</ButtonSecondary>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}