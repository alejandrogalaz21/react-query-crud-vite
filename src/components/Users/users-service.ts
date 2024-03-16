import axios from 'axios'
import { User } from './user-types'

export const usersService = axios.create({
  baseURL: 'http://localhost:3000/users'
})

export const getUsers = async () => {
  const res = await usersService.get('/')
  return res.data.data
}

export const getUserById = (id: number): Promise<void> =>
  usersService.get(`/${id}`)

export const createUser = (user: User): Promise<void> =>
  usersService.post('/', user)

export const updateUser = (user: User): Promise<void> =>
  usersService.put(`/${user.id}`, user)

export const deleteUser = (id: number): Promise<void> =>
  usersService.delete(`/${id}`)
