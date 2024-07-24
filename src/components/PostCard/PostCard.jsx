import React from 'react'

const PostCard = ({ post }) => {
  const { userId, content, timestamp, comments, likes } = post

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
            </div>
          </div>
        </div>
      </article>
    </div>
  )
}

export default PostCard
