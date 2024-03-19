import React, { useState } from 'react'
import { UserFormData } from './user-types'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createUser } from './users-service'

import { HiInformationCircle } from 'react-icons/hi'
import { Alert } from 'flowbite-react'

function UsersForm() {
  const queryClient = useQueryClient()

  const [formData, setFormData] = useState<UserFormData>({
    name: '',
    lastName: '',
    email: '',
    password: ''
  })

  const addUserMutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      // invalidate cache and refetch
      queryClient.invalidateQueries('users')
    }
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    console.log({ name, value })
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (validateForm()) {
      console.log(formData)
      addUserMutation.mutate(formData)
    }
  }

  const [errors, setErrors] = useState<Partial<UserFormData>>({})

  const validateForm = () => {
    const errors: Partial<UserFormData> = {}

    if (!formData.name.trim()) {
      errors.name = 'El nombre es requerido'
    }

    if (!formData.lastName.trim()) {
      errors.lastName = 'El apellido es requerido'
    }

    if (!formData.email.trim()) {
      errors.email = 'El correo electrónico es requerido'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'El correo electrónico no tiene un formato válido'
    }

    if (!formData.password.trim()) {
      errors.password = 'La contraseña es requerida'
    } else if (formData.password.length < 6) {
      errors.password = 'La contraseña debe tener al menos 6 caracteres'
    }

    setErrors(errors)

    return Object.keys(errors).length === 0
  }

  return (
    <form className='max-w-md mx-auto' onSubmit={handleSubmit}>
      <div className='relative z-0 w-full mb-5 group'>
        <input
          type='email'
          name='email'
          id='email'
          className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
          value={formData.email}
          onChange={handleChange}
        />
        <label
          htmlFor='email'
          className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>
          Email address
        </label>
        {errors.email && (
          <>
            <br />
            <div
              className='flex items-center p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300'
              role='alert'>
              <svg
                className='flex-shrink-0 inline w-4 h-4 me-3'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='currentColor'
                viewBox='0 0 20 20'>
                <path d='M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z' />
              </svg>
              <span className='sr-only'>Info</span>
              <div>
                <span className='font-medium'>Ups !</span>
                {errors.email}
              </div>
            </div>
          </>
        )}
      </div>

      <div className='relative z-0 w-full mb-5 group'>
        <input
          type='password'
          name='password'
          id='password'
          className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
          placeholder=' '
          value={formData.password}
          onChange={handleChange}
        />
        <label
          htmlFor='password'
          className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>
          Password
        </label>
        {errors.password && <span>{errors.password}</span>}
      </div>

      <div className='grid md:grid-cols-2 md:gap-6'>
        <div className='relative z-0 w-full mb-5 group'>
          <input
            type='text'
            name='name'
            id='name'
            className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
            placeholder=' '
            value={formData.name}
            onChange={handleChange}
          />
          <label
            htmlFor='name'
            className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>
            First name
          </label>
          {errors.name && <span>{errors.name}</span>}
        </div>
        <div className='relative z-0 w-full mb-5 group'>
          <input
            type='text'
            name='lastName'
            id='lastName'
            className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
            placeholder=' '
            value={formData.lastName}
            onChange={handleChange}
          />

          <label
            htmlFor='lastName'
            className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>
            Last name
          </label>
          {errors.lastName && <span>{errors.lastName}</span>}
        </div>
      </div>

      <button
        type='submit'
        className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>
        Submit
      </button>
    </form>
  )
}

export default UsersForm
