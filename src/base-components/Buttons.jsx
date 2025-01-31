import React from 'react'

const ButtonPrimary = ({ children, onClick, type }) => {
  return (
    <>
      <button
        type={type}
        className='bg-primary border-primary border-2 px-4 py-1.5 text-sm text-white font-medium text-primary rounded-lg flex justify-center items-center gap-1 hover:bg-secondary hover:border-secondary transition'
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
        className='bg-secondary border-secondary border-2 px-4 py-1.5 text-sm text-white font-medium text-primary rounded-lg flex justify-center items-center gap-1 hover:bg-primary hover:border-primary transition'
        onClick={onClick}
      >
        {children}
      </button>
    </>
  )
}

const ButtonPrimaryOutline = ({ children, onClick }) => {
  return (
    <>
      <button
        className='bg-primary/30 border-primary border-2 px-4 py-1.5 text-sm text-secondary font-medium rounded-lg flex justify-center items-center gap-1 hover:bg-primary hover:text-white transition'
        onClick={onClick}
      >
        {children}
      </button>
    </>
  )
}

const ButtonSecondaryOutline = ({ children, onClick }) => {
  return (
    <>
      <button
        className='bg-secondary/30 border-secondary border-2 px-4 py-1.5 text-sm text-secondary font-medium rounded-lg flex justify-center gap-2 items-center hover:bg-secondary hover:text-white transition'
        onClick={onClick}
      >
        {children}
      </button>
    </>
  )
}

export { ButtonPrimary, ButtonSecondary, ButtonPrimaryOutline, ButtonSecondaryOutline }