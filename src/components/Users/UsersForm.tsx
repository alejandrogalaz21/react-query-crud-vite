import React, { useState } from 'react'
import { UserFormData } from './user-types'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createUser } from './users-service'

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
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor='name'>Nombre:</label>
        <input
          type='text'
          id='name'
          name='name'
          value={formData.name}
          onChange={handleChange}
        />
        {errors.name && <span>{errors.name}</span>}
      </div>
      <div>
        <label htmlFor='lastName'>Apellido:</label>
        <input
          type='text'
          id='lastName'
          name='lastName'
          value={formData.lastName}
          onChange={handleChange}
        />
        {errors.lastName && <span>{errors.lastName}</span>}
      </div>
      <div>
        <label htmlFor='email'>Correo electrónico:</label>
        <input
          type='email'
          id='email'
          name='email'
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <span>{errors.email}</span>}
      </div>
      <div>
        <label htmlFor='password'>Contraseña:</label>
        <input
          type='password'
          id='password'
          name='password'
          value={formData.password}
          onChange={handleChange}
        />
        {errors.password && <span>{errors.password}</span>}
      </div>
      <button type='submit'>Enviar</button>
    </form>
  )
}

export default UsersForm
