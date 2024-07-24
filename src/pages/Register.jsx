import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '@/services/api' // Usa tu servicio API
import logo from '@/assets/medios.png'

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
    bio: ''
  })
  const [isUsernameAvailable, setIsUsernameAvailable] = useState(true)
  const [usernameMessage, setUsernameMessage] = useState('')
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  useEffect(() => {
    const checkUsernameAvailability = async (username) => {
      if (username.trim() === '') return

      try {
        const response = await api.get(`/auth/check-username/${username}`)
        setIsUsernameAvailable(response.data.isAvailable)
        setUsernameMessage(response.data.isAvailable ? 'Username is available' : 'Username is not available')
      } catch (error) {
        console.error('Error checking username availability:', error)
        setUsernameMessage('Error checking username availability')
      }
    }

    checkUsernameAvailability(formData.username)
  }, [formData.username])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!isUsernameAvailable) {
      alert('Username is not available. Please choose another one.')
      return
    }

    try {
      const response = await api.post('/auth/register', formData)
      console.log('Registro exitoso:', response.data)
      alert('Registro exitoso. ¡Por favor, inicia sesión!')
      navigate('/login')
    } catch (error) {
      console.error('Error al registrar:', error)
      alert('Error al registrar. Por favor, intenta nuevamente.')
    }
  }

  return (
    <div className='section'>
      <div className='container'>
        <div className='columns is-centered'>
          <div className='column is-one-third'>
            <h1 className='title'>Register</h1>
            <div className='box'>
              <form onSubmit={handleSubmit}>
                <img src={logo} alt='Logo' width='50' height='30' className='is-one-third' />
                <div className='field'>
                  <label className='label'>First Name</label>
                  <div className='control'>
                    <input
                      className='input'
                      type='text'
                      placeholder='First Name'
                      name='firstName'
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className='field'>
                  <label className='label'>Last Name</label>
                  <div className='control'>
                    <input
                      className='input'
                      type='text'
                      placeholder='Last Name'
                      name='lastName'
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className='field'>
                  <label className='label'>Email</label>
                  <div className='control'>
                    <input
                      className='input'
                      type='email'
                      placeholder='email@example.com'
                      name='email'
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className='field'>
                  <label className='label'>Username</label>
                  <div className='control'>
                    <input
                      className='input'
                      type='text'
                      placeholder='Username'
                      name='username'
                      value={formData.username}
                      onChange={handleChange}
                      required
                    />
                    <p style={{ color: isUsernameAvailable ? 'green' : 'red' }}>{usernameMessage}</p>
                  </div>
                </div>
                <div className='field'>
                  <label className='label'>Password</label>
                  <div className='control'>
                    <input
                      className='input'
                      type='password'
                      placeholder='********'
                      name='password'
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className='field'>
                  <label className='label'>Bio</label>
                  <div className='control'>
                    <textarea
                      className='textarea'
                      placeholder='Short bio'
                      name='bio'
                      value={formData.bio}
                      onChange={handleChange}
                      maxLength='250'
                    />
                  </div>
                </div>
                <div className='field'>
                  <button
                    type='submit'
                    className='button is-fullwidth is-primary'
                  >
                    Register
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
