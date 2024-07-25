import React, { useState, useEffect } from 'react'
import api from '../services/api'

const Following = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get('/users/followings/posts')

        if (Array.isArray(response.data)) {
          setPosts(response.data)
        } else {
          throw new Error('Respuesta de API inesperada')
        }
        setLoading(false)
      } catch (error) {
        setError(error.message)
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  if (loading) return <div>Cargando...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div className='container'>
      <h1 className='title'>Posts de tus Seguidores</h1>
      <div className='columns is-multiline'>
        {posts.length > 0
          ? (
              posts.slice().reverse().map(post => (
                <div className='column is-one-third' key={post._id}>
                  <div className='box'>
                    <article className='media'>
                      <div className='media-left'>
                        <figure className='image is-64x64'>
                          <img src={post.userId.avatar} alt={post.userId.username} />
                        </figure>
                      </div>
                      <div className='media-content'>
                        <div className='content'>
                          <p>
                            <strong>{post.userId.username}</strong>
                            <br />
                            {post.content}
                            <br />
                            <small>{new Date(post.timestamp).toLocaleString()}</small>
                          </p>
                        </div>
                      </div>
                    </article>
                  </div>
                </div>
              ))
            )
          : (
            <p>No hay posts disponibles.</p>
            )}
      </div>
    </div>
  )
}

export default Following
