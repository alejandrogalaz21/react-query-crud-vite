import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query'
import './App.css'

// Create a client
const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <h1>Crud</h1>
    </QueryClientProvider>
  )
}

export default App
