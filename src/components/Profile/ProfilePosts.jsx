import { useState } from 'react'
import api from '@/services/api'
import PostModal from '../postModal/postModal'

const ProfilePosts = ({ userId, user, posts, setPosts, showSuccessAlert, setShowSuccessAlert, onNewPost }) => {
  const [newPostContent, setNewPostContent] = useState('')
  const [selectedPost, setSelectedPost] = useState(null)

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
      const token = localStorage.getItem('token')
      const response = await api.post(`/users/${userId}/posts`, { content: newPostContent }, {
        headers: {
          Authorization: `${token}`
        }
      })
      setPosts([response.data.post, ...posts])
      setNewPostContent('')
      setShowSuccessAlert(true)
      onNewPost()
      setTimeout(() => setShowSuccessAlert(false), 2000)
    } catch (error) {
      console.error('Error al crear el post:', error)
    }
  }

  return (
    <div className='column is-centered mt-5'>
      <div className='box'>
        <div className='field'>
          <div className='control'>
            <textarea
              className='textarea is-primary'
              placeholder='¿Qué está pasando?'
              value={newPostContent}
              onChange={handleNewPostChange}
            />
          </div>
        </div>
        <button className='button is-primary is-fullwidth mt-2' onClick={handleNewPostSubmit}>
          Publicar
        </button>
        {showSuccessAlert && (
          <div className='notification is-success mt-2'>
            <button className='delete' onClick={() => setShowSuccessAlert(false)} />
            ¡Publicación creada con éxito!
          </div>
        )}
      </div>
      {posts.length > 0
        ? posts.slice().reverse().map((post) => (
          <div className='box' key={post._id} onClick={() => handlePostClick(post)}>
            <article className='media'>
              <figure className='media-left'>
                <p className='image is-48x48'>
                  <img className='is-rounded' src={user.avatar} alt='Avatar' />
                </p>
              </figure>
              <div className='media-content'>
                <div className='content'>
                  <p>
                    <strong>{user.username}</strong> <small>@{user.username}</small> <br />
                    {post.content}
                    <br />
                    <small>{new Date(post.timestamp).toLocaleString()}</small>
                  </p>
                </div>
              </div>
            </article>
          </div>
        ))
        : <p className='has-text-centered'>No hay publicaciones disponibles.</p>}
      {selectedPost && <PostModal post={selectedPost} onClose={closeModal} />}
    </div>
  )
}

export default ProfilePosts
