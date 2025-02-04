import { Routes, Route } from 'react-router-dom'
import { Login, Feed, Register, Profile, Following, Chat } from '@/pages'
import PrivateRoute from './ProviderRouter'

const RoutesIndex = () => {
  return (
    <>
      <Routes>
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route element={<PrivateRoute />}>
          <Route path='/' element={<Feed />} />
          <Route path='/profile/:userId' element={<Profile />} />
          <Route path='/following' element={<Following />} />
          <Route path='/chat' element={<Chat />} />

          {/* <Route path='profileId/:userId' element={<ProfileId />} /> */}
        </Route>
      </Routes>

    </>
  )
}

export default RoutesIndex
