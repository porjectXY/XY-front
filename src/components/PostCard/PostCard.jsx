const PostCard = ({ post }) => {
  const likesCount = Array.isArray(post.likes) ? post.likes.length : 0
  const commentsCount = Array.isArray(post.comments) ? post.comments.length : 0

  return (
    <>
      <div className='columns is-centered'>
        <div className='column is-half'>
          <div className='card'>
            <div className='card-content'>
              <p className='title'>{post.content}</p>
              <p className='subtitle'>@{post.userId?.username || 'unknown author'}</p>
              <div className='buttons'>
                <button className='button is-small is-info'>
                  <span className='icon'>
                    <i className='fas fa-thumbs-up' />
                  </span>
                  <span>{likesCount}</span>
                </button>
                <button className='button is-small is-link'>
                  <span className='icon'>
                    <i className='fas fa-comment' />
                  </span>
                  <span>{commentsCount}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default PostCard
