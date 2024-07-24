import React from 'react'

const ModalFollows = ({ isOpen, onClose, title, users }) => {
  if (!isOpen) return null

  return (
    <div className={`modal ${isOpen ? 'is-active' : ''}`}>
      <div className='modal-background' onClick={onClose} />
      <div className='modal-card'>
        <header className='modal-card-head'>
          <p className='modal-card-title'>{title}</p>
          <button className='delete' aria-label='close' onClick={onClose} />
        </header>
        <section className='modal-card-body'>
          {users.length > 0
            ? (
                users.map(user => (
                  <div key={user._id} className='box'>
                    <article className='media'>
                      <figure className='media-left'>
                        <p className='image is-64x64'>
                          <img className='is-rounded' src={user.avatar} alt='User avatar' />
                        </p>
                      </figure>
                      <div className='media-content'>
                        <div className='content'>
                          <p>
                            <strong>{user.firstName} {user.lastName}</strong>
                            <br />
                            @{user.username}
                            <br />
                            {user.bio}
                          </p>
                        </div>
                      </div>
                    </article>
                  </div>
                ))
              )
            : (
              <p>No users found.</p>
              )}
        </section>
        <footer className='modal-card-foot'>
          <button className='button' onClick={onClose}>Close</button>
        </footer>
      </div>
    </div>
  )
}

export default ModalFollows
