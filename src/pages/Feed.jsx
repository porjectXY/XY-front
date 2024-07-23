import React, { useEffect, useState } from 'react'
import PostCard from '@/components/PostCard'
import axios from 'axios'
// import { getPosts } from '../services/useService' // Asegúrate de que la ruta sea correcta

const Feed = () => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:8000/posts')
        setPosts(response.data) // Asegúrate de que esto es correcto
      } catch (error) {
        console.error('Error fetching posts:', error)
      }
    }

    fetchPosts()
  }, [])

  return (
    <div>
      {posts.map(post => (
        <PostCard key={post._id} post={post} />
      ))}
    </div>
  )
}

export default Feed
