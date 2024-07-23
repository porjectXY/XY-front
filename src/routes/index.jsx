import { Routes, Route } from 'react-router-dom'
import { Login, Feed, Register, Profile } from '@/pages'

const RoutesIndex = () => {
  return (
    <>
      <Routes>
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<Feed />} />
        <Route path='/profile' element={<Profile />} />
      </Routes>

    </>
  )
}

export default RoutesIndex
