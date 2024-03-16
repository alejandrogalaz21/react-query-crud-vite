import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getUsers } from './users-service'
import { UsersTable } from '.'

function Users() {
  const {
    isLoading,
    data: users,
    isError,
    error
  } = useQuery({
    queryKey: ['users'],
    queryFn: getUsers
  })

  if (isLoading) return <div>Loading...</div>
  else if (isError) return <div>{error.message}</div>

  return <UsersTable users={users} />
}

export default Users
