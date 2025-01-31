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
      <div className='w-full h-screen flex justify-center items-center'>
        <div className='h-fit flex justify-center items-center gap-5'>
          <div className='w-80 h-fit flex flex-col gap-4'>
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
                  <p className='ml-2'>Supported formats: .jpg, .jpeg, .png</p>
                </li>
                <li className='flex items-center'>
                  <Circle fill='white' size={6} />
                  <p className='ml-2'>Max file size: 20mb</p>
                </li>
              </ul>
            </div>
          </div>
          <div className='w-[30rem] h-[444px] flex flex-col border-2 border-primary rounded-xl p-5'>
            <div className='flex flex-col justify-center gap-3 h-[320px]'>
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
            <div className='flex flex-1 justify-between items-end'>
              <Link to='/'>
                <ButtonSecondaryOutline>Cancel</ButtonSecondaryOutline>
              </Link>
              <ButtonSecondary>Upload</ButtonSecondary>
            </div>
            </div>
        </div>
      </div>
    </>
  )
}
