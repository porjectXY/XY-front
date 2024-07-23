import React, { useEffect, useState } from 'react'
import PostCard from '@/components/PostCard'
import { getPosts } from '../services/useService'

const Feed = () => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await getPosts()
        setPosts(response.data)
        console.log(response.data)
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
