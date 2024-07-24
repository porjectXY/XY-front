import React, { useState } from 'react'
import PostModalFeed from '../postModalFeed/postModalFeed'

const PostCard = ({ post }) => {
  const { userId, content, timestamp, comments, likes } = post
  const [modalOpen, setModalOpen] = useState(false)

  const openModal = () => {
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
  }

  return (
    <div className='box'>
      <article className='media'>
        <figure className='media-left'>
          <p className='image is-64x64'>
            <img src={userId.avatar} alt={userId.username} className='is-rounded' />
          </p>
        </figure>
        <div className='media-content'>
          <div className='content'>
            <p>
              <strong>{userId.username}</strong>
              <br />
              {content}
              <br />
              <small>{new Date(timestamp).toLocaleString()}</small>
            </p>
          </div>
          <div className='media-footer'>
            <div className='level'>
              <div className='level-left'>
                <span className='level-item'>{comments.length} Comments</span>
                <span className='level-item'>{likes.length} Likes</span>
              </div>
              <div className='level-right'>
                <button className='button is-info' onClick={openModal}>
                  View Comments
                </button>
              </div>
            </div>
          </div>
        </div>
      </article>
      {modalOpen && <PostModalFeed post={post} onClose={closeModal} />}
    </div>
  )
}

export default PostCard
