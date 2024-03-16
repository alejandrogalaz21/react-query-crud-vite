import React from 'react'

interface User {
  id: number
  name: string
  lastName: string
  email: string
}

interface UserTableProps {
  users: User[]
}

function UsersTable({ users }: UserTableProps): JSX.Element {
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Correo Electrónico</th>
        </tr>
      </thead>
      <tbody>
        {users.map(user => (
          <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td>{user.lastName}</td>
            <td>{user.email}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default UsersTable
