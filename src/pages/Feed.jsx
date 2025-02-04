import React, { useEffect, useState, useCallback } from 'react'
import api from '../services/api'
import PostCard from '@/components/PostCard'

const Feed = () => {
  const [posts, setPosts] = useState([])
  const [newPost, setNewPost] = useState('')
  const [showSuccessAlert, setShowSuccessAlert] = useState(false)
  const [userId, setUserId] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredPosts, setFilteredPosts] = useState([])

  const handleNewPostChange = (e) => {
    setNewPost(e.target.value)
  }

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
  }

  const fetchPosts = async () => {
    try {
      const response = await api.get('/posts')
      setPosts(response.data)
    } catch (error) {
      console.error('Error fetching posts:', error)
    }
  }

  const searchUsers = useCallback(async () => {
    try {
      const response = await api.get('/search', { params: { searchTerm } })
      const userNames = response.data.users.map(user => user.username)

      const filtered = posts.filter(post => userNames.includes(post.userId.username))
      setFilteredPosts(filtered)
    } catch (error) {
      console.error('Error searching users:', error)
    }
  }, [searchTerm, posts])

  const getUserIdFromToken = (token) => {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]))
      return payload.userId
    } catch (error) {
      console.error('Error decoding token:', error)
      return null
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      const userIdFromToken = getUserIdFromToken(token)
      setUserId(userIdFromToken)
    }
    fetchPosts()
  }, [])

  useEffect(() => {
    if (searchTerm) {
      searchUsers()
    } else {
      setFilteredPosts(posts)
    }
  }, [searchTerm, posts, searchUsers])

  const handleNewPostSubmit = async () => {
    if (!newPost.trim()) return
    try {
      const token = localStorage.getItem('token')
      await api.post(
        `/users/${userId}/posts`,
        { content: newPost },
        {
          headers: {
            Authorization: `${token}`
          }
        }
      )
      setShowSuccessAlert(true)
      setTimeout(() => setShowSuccessAlert(false), 2000)
      setNewPost('')
      fetchPosts()
    } catch (error) {
      console.error('Error creating post:', error)
    }
  }

  return (
    <div className='container mt-6'>
      <div className='box'>
        <div className='field mt-2'>
          <div className='control'>
            <textarea
              className='textarea is-primary'
              placeholder='What’s happening?'
              value={newPost}
              onChange={handleNewPostChange}
            />
          </div>
        </div>
        <button className='button is-primary is-fullwidth mt-2' onClick={handleNewPostSubmit}>
          Post
        </button>
        {showSuccessAlert && (
          <div className='notification is-success mt-2'>
            <button className='delete' onClick={() => setShowSuccessAlert(false)} />
            Post created successfully!
          </div>
        )}
        <div className='field mt-4'>
          <div className='control'>
            <input
              className='input'
              type='text'
              placeholder='Search users by username...'
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
        </div>
        {filteredPosts.slice().reverse().map((post) => (
          <div className='mt-6' key={post._id}>
            <PostCard post={post} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Feed
