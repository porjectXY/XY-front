import { useState, useEffect } from 'react'
import ModalFollows from '../ModalFollows/ModalFollows'
import api from '@/services/api'

const ProfileInfo = ({ userId }) => {
  const [user, setUser] = useState({})
  const [followers, setFollowers] = useState([])
  const [following, setFollowing] = useState([])
  const [isFollowersModalOpen, setIsFollowersModalOpen] = useState(false)
  const [isFollowingModalOpen, setIsFollowingModalOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!userId) {
      setError('User ID is missing')
      setLoading(false)
      return
    }

    const fetchUserData = async () => {
      try {
        const response = await api(`/users/${userId}/followData`)
        setUser(response.data)
        setFollowers(response.data.followers)
        setFollowing(response.data.following)
      } catch (error) {
        setError('Error fetching user data')
        console.error('Error fetching user data:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchUserData()
  }, [userId])

  const toggleFollowersModal = () => {
    setIsFollowersModalOpen(!isFollowersModalOpen)
  }

  const toggleFollowingModal = () => {
    setIsFollowingModalOpen(!isFollowingModalOpen)
  }

  if (loading) return <p>Loading...</p>
  if (error) return <p>{error}</p>

  return (
    <div className='column is-one-quarter'>
      <div className='box'>
        <div className='media'>
          <figure className='media-left'>
            <p className='image is-128x128'>
              <img className='is-rounded' src={user.avatar} alt='Profile Avatar' />
            </p>
          </figure>
          <div className='media-content'>
            <div className='content'>
              <h1 className='title is-4'>{user.username}</h1>
              <p className='subtitle is-6'>@{user.username}</p>
              <p>{user.bio}</p>
            </div>
          </div>
        </div>
        <nav className='level'>
          <div className='level-item has-text-centered' onClick={toggleFollowersModal}>
            <div>
              <p className='heading'>Followers</p>
              <p className='title'>{followers.length}</p>
            </div>
          </div>
          <div className='level-item has-text-centered' onClick={toggleFollowingModal}>
            <div>
              <p className='heading'>Following</p>
              <p className='title'>{following.length}</p>
            </div>
          </div>
        </nav>
      </div>
      <ModalFollows
        isOpen={isFollowersModalOpen}
        onClose={toggleFollowersModal}
        title='Followers'
        users={followers}
      />
      <ModalFollows
        isOpen={isFollowingModalOpen}
        onClose={toggleFollowingModal}
        title='Following'
        users={following}
      />
    </div>
  )
}

export default ProfileInfo
