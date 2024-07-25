import React from 'react'
import { useNavigate } from 'react-router-dom'
import PostModalFeed from '../postModalFeed/'

const PostCard = ({ post }) => {
  const { userId, content, timestamp, comments, likes } = post
  const [modalOpen, setModalOpen] = React.useState(false)
  const navigate = useNavigate()

  const openModal = () => {
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
  }

  const goToProfile = () => {
    navigate(`/profile/${userId._id}`)
  }

  return (
    <div className='box'>
      <article className='media'>
        <figure className='media-left'>
          <p className='image is-64x64'>
            <img
              src={userId.avatar}
              alt={userId.username}
              className='is-rounded'
              onClick={goToProfile}
              style={{ cursor: 'pointer' }}
            />
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
