import { BrowserRouter } from 'react-router-dom'
import NavBar from '@/components/NavBar'
import RoutesIndex from '@/routes'
import { AuthProvider } from '@/context/AuthContext'

function App () {
  return (
    <>

      <BrowserRouter>
        <AuthProvider>
          <NavBar />
          <RoutesIndex />
        </AuthProvider>
      </BrowserRouter>

    </>
  )
}

export default App
