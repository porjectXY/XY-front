import React, { useEffect, useState } from 'react'
import api from '../services/api' // Asegúrate de que la ruta sea correcta
import PostCard from '@/components/PostCard'

const Feed = () => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get('/posts') // Usa la instancia `api`
        setPosts(response.data)
      } catch (error) {
        console.error('Error fetching posts:', error)
      }
    }

    fetchPosts()
  }, [])

  return (
    <div className='container mt-6'>
      <div className='box'>
        <div className='field mt-2'>
          <div className='control'>
            <textarea
              className='textarea is-primary'
              placeholder='¿Qué está pasando?'
            />
          </div>
        </div>
        <button className='button is-primary is-fullwidth mt-2'>
          Publicar
        </button>
        {posts.slice().reverse().map(post => (
          <div className='mt-6' key={post._id}>
            <PostCard post={post} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Feed
