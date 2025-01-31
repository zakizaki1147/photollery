import React from 'react'
import { NavigationBar } from '../components/NavigationBar'
import { Circle, ImageUp, Upload } from 'lucide-react'
import { TextForm } from '../base-components/InputForms'
import { ButtonSecondary, ButtonSecondaryOutline } from '../base-components/Buttons'
import { Link } from 'react-router-dom'

export const AddPhotoPage = () => {
  return (
    <>
      <div className='w-full fixed top-0 z-10'>
        <NavigationBar />
      </div>
      <div className='mt-20 flex justify-center items- gap-4'>
        <div className='w-80 flex flex-col gap-4'>
          <div className='h-80 rounded-xl bg-primary border-4 border-secondary border-dashed flex flex-col justify-center items-center gap-4'>
            <div className='text-primary bg-secondary rounded-lg p-1 mt-10 flex justify-center items-center'>
              <ImageUp size={40} />
            </div>
            <p className='text-center text-sm leading-tight select-none'>Choose your image <br /> or upload it here.</p>
          </div>
          <div className='rounded-xl bg-secondary p-3 text-white'>
            <p>Notes:</p>
            <ul className='text-sm'>
              <li className='flex items-center'>
                <Circle fill='white' size={6} />
                <p className='ml-2'>Supported formats: .jpg, .png</p>
              </li>
              <li className='flex items-center'>
                <Circle fill='white' size={6} />
                <p className='ml-2'>Max file size: 20mb</p>
              </li>
            </ul>
          </div>
        </div>
        <div className='w-[30rem] p-5'>
          <div className='flex flex-col gap-3'>
            <div>
              <label 
                htmlFor="judulFoto"
                className='font-medium text-sm text-secondary'
              >Photo Title</label>
              <TextForm
                placeholder='Photo Title'
                id='judulFoto'
              />
            </div>
            <div>
              <label 
                htmlFor="deskripsiFoto"
                className='font-medium text-sm text-secondary'
                >Photo Description</label>
              <TextForm
                placeholder='Photo Description'
                id='deskripsiFoto'
              />
            </div>
          </div>
          <div className='flex justify-between items-center mx-1'>
            <Link to='/'>
              <ButtonSecondaryOutline>Cancel</ButtonSecondaryOutline>
            </Link>
            <ButtonSecondary>Upload</ButtonSecondary>
          </div>
        </div>
      </div>
    </>
  )
}
