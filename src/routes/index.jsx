import { Routes, Route } from 'react-router-dom'
import { Login, Feed, Register } from '@/pages'

const RoutesIndex = () => {
  return (
    <>
      <Routes>
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<Feed />} />
      </Routes>

    </>
  )
}

export default RoutesIndex
