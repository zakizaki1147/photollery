import { CopyPlus } from 'lucide-react'
import React from 'react'

const ButtonPrimary = ({ children, onClick, type }) => {
  return (
    <>
      <button
        type={type}
        className='bg-primary border-primary border-2 px-4 py-1.5 w-full text-sm text-white font-medium text-primary rounded-lg flex justify-center items-center gap-1 hover:bg-secondary hover:border-secondary transition'
        onClick={onClick}
      >
        {children}
      </button>
    </>
  )
}

const ButtonSecondary = ({ children, onClick, type }) => {
  return (
    <>
      <button
        type={type}
        className='bg-secondary border-secondary border-2 px-4 py-1.5 w-full text-sm text-white font-medium text-primary rounded-lg flex justify-center items-center gap-1 hover:bg-primary hover:border-primary transition'
        onClick={onClick}
      >
        {children}
      </button>
    </>
  )
}

const ButtonPrimaryOutline = ({ children, onClick, type }) => {
  return (
    <>
      <button
        type={type}
        className='bg-primary/30 border-primary border-2 px-4 py-1.5 w-full text-sm text-secondary font-medium rounded-lg flex justify-center items-center gap-1 hover:bg-primary hover:text-white transition'
        onClick={onClick}
      >
        {children}
      </button>
    </>
  )
}

const ButtonSecondaryOutline = ({ children, onClick, type }) => {
  return (
    <>
      <button
        type={type}
        className='bg-secondary/30 border-secondary border-2 px-4 py-1.5 w-full text-sm text-secondary font-medium rounded-lg flex justify-center gap-2 items-center hover:bg-secondary hover:text-white transition'
        onClick={onClick}
      >
        {children}
      </button>
    </>
  )
}

const ButtonNewAlbum = ({ onClick }) => {
  return (
    <>
      <button
        type='button'
        className='w-full max-w-96 h-60 rounded-xl flex flex-col justify-center items-center gap-3 text-gray-400 hover:text-secondary hover:bg-primary/20 border-2 hover:border-4 border-dashed hover:border-primary transition'
        onClick={onClick}
      >
        <div className='mt-6'>
          <CopyPlus size={40} />
        </div>
        <p className='text-sm select-none'>Create new album.</p>
      </button>
    </>
  )
}

export { ButtonPrimary, ButtonSecondary, ButtonPrimaryOutline, ButtonSecondaryOutline, ButtonNewAlbum }