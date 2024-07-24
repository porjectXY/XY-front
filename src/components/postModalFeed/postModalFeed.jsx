import React from 'react'

const PostModalFeed = ({ post, onClose }) => {
  const { userId, content, timestamp, comments } = post

  return (
    <div className='modal is-active'>
      <div className='modal-background' onClick={onClose} />
      <div className='modal-content'>
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
              <div className='comments'>
                {comments.map((comment) => (
                  <div key={comment._id} className='comment'>
                    <p>
                      <strong>{comment.userId.username}</strong> {comment.content}
                    </p>
                    <small>{new Date(comment.timestamp).toLocaleString()}</small>
                  </div>
                ))}
              </div>
            </div>
          </article>
        </div>
        <div className='field'>
          <div className='control'>
            <textarea className='textarea' placeholder='Write a comment...' />
          </div>
        </div>
      </div>
      <button className='modal-close is-large' aria-label='close' onClick={onClose} />
    </div>
  )
}

export default PostModalFeed
