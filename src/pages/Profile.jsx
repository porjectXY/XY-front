import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../services/api'
import PostModal from '@/components/postModal'

const Profile = () => {
  const { userId } = useParams()
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [posts, setPosts] = useState([])
  const [loadingProfile, setLoadingProfile] = useState(true)
  const [loadingFollowData, setLoadingFollowData] = useState(true)
  const [selectedPost, setSelectedPost] = useState(null)
  const [newPostContent, setNewPostContent] = useState('')
  const [followers, setFollowers] = useState([])
  const [following, setFollowing] = useState([])
  const [followersModal, setFollowersModal] = useState(false)
  const [followingModal, setFollowingModal] = useState(false)

  useEffect(() => {
    console.log('Current userId:', userId)
    if (!userId) return // Add a guard clause if userId is undefined

    const fetchProfile = async () => {
      try {
        const response = await api.get(`/users/${userId}/profile`)
        console.log('User Data:', response.data)
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
    console.log('Current userId for follow data:', userId)
    if (!userId) return // Add a guard clause if userId is undefined

    const fetchFollowData = async () => {
      try {
        const response = await api.get(`/users/${userId}/followData`)
        console.log('Follow Data:', response.data)
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

  const handlePostClick = (post) => {
    setSelectedPost(post)
  }

  const closeModal = () => {
    setSelectedPost(null)
  }

  const handleNewPostChange = (e) => {
    setNewPostContent(e.target.value)
  }

  const handleNewPostSubmit = async () => {
    if (!newPostContent.trim()) return
    try {
      const response = await api.post(`/users/${userId}/posts`, { content: newPostContent })
      setPosts([response.data.post, ...posts])
      setNewPostContent('')
    } catch (error) {
      console.error('Error creating post:', error)
    }
  }

  const toggleFollowersModal = () => {
    setFollowersModal(!followersModal)
  }

  const toggleFollowingModal = () => {
    setFollowingModal(!followingModal)
  }

  const handleUserClick = (userId) => {
    navigate(`/profile/${userId}`)
  }

  if (loadingProfile || loadingFollowData) {
    return <div className='loading'>Loading...</div>
  }

  if (!user) {
    return <div className='error'>Error loading profile</div>
  }

  return (
    <div className='columns'>
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
      </div>
      <div className='column'>
        <div className='box'>
          <input
            className='input is-fullwidth'
            type='text'
            placeholder='What’s happening?'
            value={newPostContent}
            onChange={handleNewPostChange}
          />
          <button className='button is-primary mt-2' onClick={handleNewPostSubmit}>
            Post
          </button>
        </div>
        {posts.length > 0
          ? (
              posts.map((post) => (
                <div className='box' key={post._id} onClick={() => handlePostClick(post)}>
                  <div className='content'>
                    <p>{post.content}</p>
                  </div>
                </div>
              ))
            )
          : (
            <p>No posts available.</p>
            )}
      </div>
      {selectedPost && <PostModal post={selectedPost} onClose={closeModal} />}
      {followersModal && (
        <div className={`modal ${followersModal ? 'is-active' : ''}`}>
          <div className='modal-background' onClick={toggleFollowersModal} />
          <div className='modal-content'>
            <div className='box'>
              <h2 className='title'>Followers</h2>
              {user.followers.length > 0
                ? (
                    followers.map((follower) => (
                      <div key={follower._id} className='media' onClick={() => handleUserClick(follower._id)}>
                        <figure className='media-left'>
                          <p className='image is-48x48'>
                            <img className='is-rounded' src={user.avatar} alt='Follower Avatar' />
                          </p>
                        </figure>
                        <div className='media-content'>
                          <div className='content'>
                            <strong>{user.username}</strong> <small>@{user.username}</small>
                            <br />
                            <small>{user.firstName} {user.lastName}</small>
                          </div>
                        </div>
                      </div>
                    ))
                  )
                : (
                  <p>No followers available.</p>
                  )}
            </div>
          </div>
          <button className='modal-close is-large' aria-label='close' onClick={toggleFollowersModal} />
        </div>
      )}
      {followingModal && (
        <div className={`modal ${followingModal ? 'is-active' : ''}`}>
          <div className='modal-background' onClick={toggleFollowingModal} />
          <div className='modal-content'>
            <div className='box'>
              <h2 className='title'>Following</h2>
              {user.following.length > 0
                ? (
                    following.map((followed) => (
                      <div key={followed._id} className='media' onClick={() => handleUserClick(followed._id)}>
                        <figure className='media-left'>
                          <p className='image is-48x48'>
                            <img className='is-rounded' src={user.avatar} alt='Followed Avatar' />
                          </p>
                        </figure>
                        <div className='media-content'>
                          <div className='content'>
                            <strong>{user.username}</strong> <small>@{user.username}</small>
                            <br />
                            <small>{user.firstName} {user.lastName}</small>
                          </div>
                        </div>
                      </div>
                    ))
                  )
                : (
                  <p>No following available.</p>
                  )}
            </div>
          </div>
          <button className='modal-close is-large' aria-label='close' onClick={toggleFollowingModal} />
        </div>
      )}
    </div>
  )
}

export default Profile
