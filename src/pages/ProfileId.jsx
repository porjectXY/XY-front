import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import api from '@/services/api'
import PostModal from '@/components/postModal'

const ProfileId = () => {
  const { userId } = useParams() 
  const [user, setUser] = useState(null)
  const [posts, setPosts] = useState([])
  const [followers, setFollowers] = useState([])
  const [following, setFollowing] = useState([])
  const [loadingProfile, setLoadingProfile] = useState(true)
  const [loadingFollowData, setLoadingFollowData] = useState(true)
  const [selectedPost, setSelectedPost] = useState(null)
  const [followersModal, setFollowersModal] = useState(false)
  const [followingModal, setFollowingModal] = useState(false)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get(`/users/${userId}/profile?timestamp=${new Date().getTime()}`)
        setUser(response.data.user)
        setPosts(response.data.posts)
      } catch (error) {
        console.error('Error fetching profile:', error)
      } finally {
        setLoadingProfile(false)
      }
    }

    const fetchFollowData = async () => {
      try {
        const response = await api.get(`/users/${userId}/followData?timestamp=${new Date().getTime()}`)
        setFollowers(response.data.followers || [])
        setFollowing(response.data.following || [])
      } catch (error) {
        console.error('Error fetching follow data:', error)
      } finally {
        setLoadingFollowData(false)
      }
    }

    if (userId) {
      fetchProfile()
      fetchFollowData()
    }
  }, [userId])

  const handlePostClick = (post) => {
    setSelectedPost(post)
  }

  const closeModal = () => {
    setSelectedPost(null)
  }

  const toggleFollowersModal = () => {
    setFollowersModal(!followersModal)
  }

  const toggleFollowingModal = () => {
    setFollowingModal(!followingModal)
  }

  const handleUserClick = (id) => {
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
          {posts.length > 0
            ? posts.slice().reverse().map((post) => (
              <div className='box' key={post._id} onClick={() => handlePostClick(post)}>
                <div className='content'>
                  <p>{post.content}</p>
                </div>
              </div>
            ))
            : <p>No posts available.</p>}
        </div>
        {selectedPost && <PostModal post={selectedPost} onClose={closeModal} />}
      </div>
      {followersModal && (
        <div className={`modal ${followersModal ? 'is-active' : ''}`}>
          <div className='modal-background' onClick={toggleFollowersModal} />
          <div className='modal-content'>
            <div className='box'>
              <h2 className='title'>Followers</h2>
              {followers.length > 0
                ? followers.map((follower) => (
                  <div key={follower._id} className='media' onClick={() => handleUserClick(follower._id)}>
                    <figure className='media-left'>
                      <p className='image is-48x48'>
                        <img className='is-rounded' src={follower.avatar} alt='Follower Avatar' />
                      </p>
                    </figure>
                    <div className='media-content'>
                      <div className='content'>
                        <strong>{follower.username}</strong> <small>@{follower.username}</small>
                        <br />
                        <small>{follower.firstName} {follower.lastName}</small>
                      </div>
                    </div>
                  </div>
                ))
                : <p>No followers available.</p>}
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
              {following.length > 0
                ? following.map((followed) => (
                  <Link to={`/profileId/${followed._id}`} key={followed._id} className='media'>
                    <figure className='media-left'>
                      <p className='image is-48x48'>
                        <img className='is-rounded' src={followed.avatar} alt='Followed Avatar' />
                      </p>
                    </figure>
                    <div className='media-content'>
                      <div className='content'>
                        <strong>{followed.username}</strong> <small>@{followed.username}</small>
                        <br />
                        <small>{followed.firstName} {followed.lastName}</small>
                      </div>
                    </div>
                  </Link>
                ))
                : <p>No following available.</p>}
            </div>
          </div>
          <button className='modal-close is-large' aria-label='close' onClick={toggleFollowingModal} />
        </div>
      )}
    </div>
  )
}

export default ProfileId
