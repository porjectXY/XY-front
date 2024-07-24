import React, { useState } from 'react'
import api from '@/services/api' // Asegúrate de tener la configuración correcta para las llamadas a la API

const PostModal = ({ post, onClose }) => {
  const [newComment, setNewComment] = useState('')

  const handleCommentChange = (e) => {
    setNewComment(e.target.value)
  }

  const handleCommentSubmit = async () => {
    if (!newComment.trim()) return // Evitar comentarios vacíos
    try {
      await api.post(`/posts/${post._id}/comments`, { content: newComment })
      // Actualiza el post localmente (idealmente deberías obtener el post actualizado desde el servidor)
      post.comments.push({ content: newComment, _id: new Date().toISOString() })
      setNewComment('') // Limpiar el campo de entrada
    } catch (error) {
      console.error('Error adding comment:', error)
    }
  }

  return (
    <div className={`modal ${post ? 'is-active' : ''}`}>
      <div className='modal-background' onClick={onClose} />
      <div className='modal-content'>
        <div className='box'>
          <h2 className='title'>{post.content}</h2>
          <div>
            {post.comments.map((comment) => (
              <div key={comment._id} className='box'>
                <p>{comment.content}</p>
              </div>
            ))}
          </div>
          <div className='field'>
            <label className='label'>Add a comment:</label>
            <div className='control'>
              <textarea
                className='textarea'
                value={newComment}
                onChange={handleCommentChange}
                placeholder='Write your comment here...'
              />
            </div>
            <button className='button is-primary mt-2' onClick={handleCommentSubmit}>
              Submit
            </button>
          </div>
          <button className='button is-danger mt-2' onClick={onClose}>Close</button>
        </div>
      </div>
      <button className='modal-close is-large' aria-label='close' onClick={onClose} />
    </div>
  )
}

export default PostModal
