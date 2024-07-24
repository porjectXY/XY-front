import { Routes, Route } from 'react-router-dom'
import { Login, Feed, Register, Profile } from '@/pages'
import PrivateRoute from './ProviderRouter'

const RoutesIndex = () => {
  return (
    <>
      <Routes>
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route element={<PrivateRoute />}>
          <Route path='/' element={<Feed />} />
          <Route path='profile/:userId' element={<Profile />} />
        </Route>
      </Routes>

    </>
  )
}

export default RoutesIndex
