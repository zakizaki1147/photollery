import React, { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'

const TextForm = ({ placeholder, id, value, onChange }) => {
  return (
    <>
      <input 
        type="text" 
        className='w-full h-10 border-primary border-b-2 outline-none rounded-t px-1 focus:border-secondary focus:border-b-4 focus:bg-primary/20 placeholder:text-sm transition'
        placeholder={placeholder}
        id={id}
        name={id}
        value={value}
        onChange={onChange}
      />
    </>
  )
}

const PasswordForm = ({ placeholder, id, value, onChange }) => {
  const [isShowPassword, setIsShowPassword] = useState(false)
  const onShowHidePassword = () => {
    setIsShowPassword(!isShowPassword)
  }
  return (
    <>
      <div className='flex relative'>  
        <input
            type={isShowPassword ? "text" : "password"}
            className='w-full h-10 border-primary border-b-2 outline-none rounded-t px-1 focus:border-secondary focus:border-b-4 focus:bg-primary/20 placeholder:text-sm transition'
            placeholder={placeholder}
            id={id}
            name={id}
            value={value}
            onChange={onChange}
        />
        {isShowPassword ? (
        <button
          className='px-2 h-full text-primary border-primary outline-none rounded-tr absolute right-0 transition'
          onClick={onShowHidePassword}
        ><EyeOff /></button>
        ) : (
        <button
          className='px-2 h-full text-primary border-primary outline-none rounded-tr absolute right-0 transition'
          onClick={onShowHidePassword}
        ><Eye /></button>
        )}
      </div>
    </>
  )
}

export { TextForm, PasswordForm }
