import React, { useState, useEffect, useMemo } from 'react'
import io from 'socket.io-client'
import axios from 'axios'

const Chat = () => {
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  const [user, setUser] = useState(null)
  const [notifications, setNotifications] = useState([])

  const token = localStorage.getItem('token') // Obtén el token desde el almacenamiento local

  // Inicializa el socket solo una vez y lo memoiza
  const socket = useMemo(() => io('http://localhost:8000', { autoConnect: true }), [])

  useEffect(() => {
    // Obtiene los datos del usuario autenticado
    axios.get('/auth/me', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        setUser(response.data)
      })
      .catch(error => {
        console.error('Error fetching user data:', error)
      })

    // Escucha los mensajes del servidor
    socket.on('message', (msg) => {
      setMessages(prevMessages => [...prevMessages, msg])
    })

    // Escucha las notificaciones de conexión del servidor
    socket.on('notification', (notification) => {
      setNotifications(prevNotifications => [...prevNotifications, notification])
    })

    // Limpia el listener cuando el componente se desmonte
    return () => {
      socket.off('message')
      socket.off('notification')
    }
  }, [socket, token])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (message.trim() && user) {
      socket.emit('message', {
        text: message,
        user: { username: user.username, avatar: user.avatar }
      })
      setMessage('')
    }
  }

  return (
    <div className='container is-fluid'>
      <div
        className='box'
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '90vh',
          maxWidth: '600px',
          margin: '0 auto',
          position: 'relative',
          paddingBottom: '60px' // Espacio para el input
        }}
      >
        <h1 className='title'>Chat</h1>
        <div className='notification-container' style={{ padding: '10px' }}>
          {notifications.map((notification, index) => (
            <div key={index} className='notification' style={{ backgroundColor: '#f5f5f5', padding: '10px', marginBottom: '10px', borderRadius: '4px' }}>
              {notification}
            </div>
          ))}
        </div>
        <div className='message-container' style={{ flex: 1, overflowY: 'scroll', padding: '10px' }}>
          {messages.map((msg, index) => (
            <div
              key={index}
              className='message box'
              style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '1rem',
                padding: '10px'
              }}
            >
              {msg.user && msg.user.avatar
                ? (
                  <img
                    src={msg.user.avatar}
                    alt={`${msg.user.username}'s avatar`}
                    className='avatar'
                    style={{
                      borderRadius: '50%',
                      width: '40px',
                      height: '40px',
                      marginRight: '0.5rem'
                    }}
                  />
                  )
                : (
                  <div
                    className='avatar'
                    style={{
                      borderRadius: '50%',
                      width: '40px',
                      height: '40px',
                      marginRight: '0.5rem',
                      backgroundColor: '#ddd'
                    }}
                  />
                  )}
              <div>
                <strong>{msg.user ? msg.user.username : 'Desconocido'}</strong>: {msg.text}
              </div>
            </div>
          ))}
        </div>
        <form
          onSubmit={handleSubmit}
          style={{
            position: 'absolute',
            bottom: 0,
            width: '100%',
            padding: '10px',
            backgroundColor: '#fff',
            borderTop: '1px solid #ddd',
            boxShadow: '0 -2px 5px rgba(0,0,0,0.1)'
          }}
        >
          <div className='field has-addons is-expanded'>
            <div className='control is-expanded'>
              <input
                className='input'
                type='text'
                placeholder='Escribe un mensaje...'
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
            <div className='control'>
              <button className='button is-primary' type='submit'>
                Enviar
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Chat
