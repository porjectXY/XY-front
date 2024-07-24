import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../services/api'
import { ProfileInfo, ProfilePosts } from '@/components/Profile'

const Profile = () => {
  const { userId } = useParams()
  const [user, setUser] = useState(null)
  const [posts, setPosts] = useState([])
  const [loadingProfile, setLoadingProfile] = useState(true)
  const [loadingFollowData, setLoadingFollowData] = useState(true)
  const [showSuccessAlert, setShowSuccessAlert] = useState(false)
  const [followers, setFollowers] = useState([])
  const [following, setFollowing] = useState([])
  const [followersModal, setFollowersModal] = useState(false)
  const [followingModal, setFollowingModal] = useState(false)

  useEffect(() => {
    if (!userId) return

    const fetchProfile = async () => {
      try {
        const response = await api.get(`/users/${userId}/profile`)
        setUser(response.data.user)
        setPosts(response.data.posts)
      } catch (error) {
        console.error('Error fetching profile:', error)
      } finally {
        setLoadingProfile(false)
      }
    }

    fetchProfile()
  }, [userId])

  useEffect(() => {
    if (!userId) return

    const fetchFollowData = async () => {
      try {
        const response = await api.get(`/users/${userId}/followData`)
        setFollowers(response.data.followers || [])
        setFollowing(response.data.following || [])
      } catch (error) {
        console.error('Error fetching follow data:', error)
      } finally {
        setLoadingFollowData(false)
      }
    }

    fetchFollowData()
  }, [userId])

  const toggleFollowersModal = () => {
    setFollowersModal(!followersModal)
  }

  const toggleFollowingModal = () => {
    setFollowingModal(!followingModal)
  }

  if (loadingProfile || loadingFollowData) {
    return <div className='loading'>Loading...</div>
  }

  if (!user) {
    return <div className='error'>Error loading profile</div>
  }

  return (
    <div className='columns'>
      <ProfileInfo
        userId={userId}
        followers={followers}
        following={following}
        toggleFollowersModal={toggleFollowersModal}
        toggleFollowingModal={toggleFollowingModal}
      />
      <ProfilePosts
        userId={userId}
        user={user}
        posts={posts}
        setPosts={setPosts}
        showSuccessAlert={showSuccessAlert}
        setShowSuccessAlert={setShowSuccessAlert}
      />
    </div>
  )
}

export default Profile
