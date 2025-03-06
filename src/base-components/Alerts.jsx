import React, {useEffect} from 'react'
import { CircleCheck, CircleX, X } from 'lucide-react'

const SuccessAlert = ({ message, onClose }) => {
  useEffect(() => {
    if (!message) return

    const timer = setTimeout(() => {
      onClose()
    }, 4000)

    return () => clearTimeout(timer)
  }, [message, onClose])

  if (!message) return null

  return (
    <>
      <div className='w-[23rem] h-16 bg-green-100 rounded-lg border-l-[6px] border-green-500 flex shadow overflow-hidden select-none'>
        <div className='w-16 flex justify-center items-center'>
          <CircleCheck size={40} className='text-green-500' />
        </div>
        <div className='flex flex-1 items-center'>
          <p className='text-sm leading-tight text-green-500'>{message}</p>
        </div>
        <button className='w-10 hover:bg-green-500 transition' onClick={onClose}>
          <X size={20} className='m-auto' />
        </button>
      </div>
    </>
  )
}

const DangerAlert = ({ message, onClose }) => {
  useEffect(() => {
    if (!message) return

    const timer = setTimeout(() => {
      onClose()
    }, 4000)

    return () => clearTimeout(timer)
  }, [message, onClose])

  if (!message) return null

  return (
    <>
      <div className='w-[23rem] h-16 bg-red-100 rounded-lg border-l-[6px] border-red-500 flex shadow overflow-hidden select-none'>
        <div className='w-16 flex justify-center items-center'>
          <CircleX size={40} className='text-red-500' />
        </div>
        <div className='flex flex-1 items-center'>
          <p className='text-sm leading-tight text-red-500'>{message}</p>
        </div>
        <button className='w-10 hover:bg-red-500 transition' onClick={onClose}>
          <X size={20} className='m-auto' />
        </button>
      </div>
    </>
  )
}

export { SuccessAlert, DangerAlert }
