import React, { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'

const TextForm = ({ children, placeholder, id, value, onChange, error }) => {
  return (
    <>
      <label
        htmlFor={id}
        className='font-medium text-sm text-secondary'
      >{children}</label>
      <input 
        type="text" 
        className={`w-full h-10 border-b-2 outline-none rounded-t px-1 focus:border-secondary focus:border-b-4 focus:bg-primary/20 focus:placeholder:text-gray-400 placeholder:text-sm transition ${error ? 'border-red-500 placeholder:text-red-500 bg-red-100' : 'border-primary'}`}
        placeholder={`${error ? 'Please fill this field!' : placeholder}`}
        id={id}
        name={id}
        value={value}
        onChange={onChange}
      />
    </>
  )
}

const TextArea = ({ children, placeholder, id, value, onChange, error }) => {
  return (
    <>
      <label
        htmlFor={id}
        className='font-medium text-sm text-secondary'
      >{children}</label>
      <textarea
        type="text"
        className={`w-full h-[5.5rem] resize-none border-b-2 outline-none align-text-top rounded-t pl-1 pt-2 focus:border-secondary focus:border-b-4 focus:bg-primary/20 focus:placeholder:text-gray-400 placeholder:text-sm transition ${error ? 'border-red-500 placeholder:text-red-500 bg-red-100' : 'border-primary'}`}
        placeholder={`${error ? 'Please fill this field!' : placeholder}`}
        id={id}
        name={id}
        value={value}
        onChange={onChange}
      ></textarea>
    </>
  )
}

const PasswordForm = ({ children, placeholder, id, value, onChange, error }) => {
  const [isShowPassword, setIsShowPassword] = useState(false)
  const onShowHidePassword = () => {
    setIsShowPassword(!isShowPassword)
  }

  return (
    <>
      <label 
        htmlFor={id}
        className='font-medium text-sm text-secondary'
        >{children}</label>
      <div className='flex relative'>  
        <input
          type={isShowPassword ? "text" : "password"}
          className={`w-full h-10 border-b-2 outline-none rounded-t px-1 focus:border-secondary focus:border-b-4 focus:bg-primary/20 focus:placeholder:text-gray-400 placeholder:text-sm transition ${error ? 'border-red-500 placeholder:text-red-500 bg-red-100' : 'border-primary'}`}
          placeholder={`${error ? 'Please fill this field!' : placeholder}`}
          id={id}
          name={id}
          value={value}
          onChange={onChange}
        />
        {isShowPassword ? (
        <button
          className='px-2 h-full text-primary border-primary outline-none rounded-tr absolute right-0 hover:text-secondary transition'
          onClick={onShowHidePassword}
          type='button'
        ><EyeOff /></button>
        ) : (
        <button
          className='px-2 h-full text-primary border-primary outline-none rounded-tr absolute right-0 hover:text-secondary transition'
          onClick={onShowHidePassword}
          type='button'
        ><Eye /></button>
        )}
      </div>
    </>
  )
}

const Dropdown = ({ children, id, options, value, onChange, error }) => {
  return (
    <>
      <label
        htmlFor={id}
        className='font-medium text-sm text-secondary'
      >{children}</label>
      <select
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        className={`w-full h-10 border-b-2 outline-none rounded-t focus:border-secondary focus:border-b-4 focus:bg-primary/20 focus:placeholder:text-gray-400 placeholder:text-sm transition
          ${error ? 'border-red-500 placeholder:text-red-500 bg-red-100' : 'border-primary'}
          ${value ? 'text-base text-black' : 'text-sm text-gray-400'}
        `}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
    </>
  )
}

export { TextForm, TextArea, PasswordForm, Dropdown }
