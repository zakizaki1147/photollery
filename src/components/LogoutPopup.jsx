import React, { useEffect, useState } from 'react'
import ReactDom from 'react-dom'
import { useNavigate } from 'react-router-dom'
import { useBodyOverflow } from '../custom-hooks/useBodyOverflow'
import { ButtonSecondary, ButtonSecondaryOutline } from '../base-components/Buttons'
import { Frown } from 'lucide-react'

export const LogoutPopup = ({ open, onClose }) => {
  const navigate = useNavigate()
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

  const handleLogout = (e) => {
    e.preventDefault()
    localStorage.removeItem('token')
    localStorage.setItem('successLogout', 'Log out success! See you again.')
    navigate('/login', { replace: true })
  }
  
  return ReactDom.createPortal (
    <>
      <div className='fixed inset-0 bg-black/50 z-20' onClick={handleClose}></div>
      <div className='w-full h-screen fixed inset-0 z-30' onClick={handleClose}>
        <div className='w-full h-screen relative flex justify-center items-center'>
          <div
            className='h-fit flex justify-center items-center gap-5 p-5 bg-gradient-to-tr from-secondary to-primary rounded-2xl'
            onClick={(e) => e.stopPropagation()}
          >
            <form onSubmit={handleLogout} className='w-[25rem] h-full bg-white p-5 rounded-xl'>
              <div className='flex flex-col justify-between items-center gap-5'>
                <p>You sure you want to Log Out?</p>
                <Frown size={50} strokeWidth={2} />
                <div className='flex gap-5 w-full'>
                  <div className='w-1/2'>
                    <ButtonSecondaryOutline onClick={handleClose} type='button'>Cancel</ButtonSecondaryOutline>
                  </div>
                  <div className='w-1/2'>
                    <ButtonSecondary type='submit'>Log Out</ButtonSecondary>
                  </div>
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
