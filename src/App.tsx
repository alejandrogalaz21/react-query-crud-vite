import './App.css'
import { Users, UsersForm, UsersTable } from '@components/Users'
import Counter from '@components/count/Counter'

function App() {
  return (
    <>
      <br />
      <br />
      <UsersForm />
      <br />
      <Users />
      {/* <Counter /> */}
    </>
  )
}

export default App
