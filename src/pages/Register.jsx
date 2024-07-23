import logo from '@/assets/medios.png'

const Register = () => {
  return (
    <>
      <div className='section'>
        <div className='container'>
          <div className='columns is-centered'>
            <div className='column is-one-third'>
              <h1 className='title'>Register</h1>
              <div className='box'>
                <form>
                  <img src={logo} alt='Logo' width='50' height='30' className='is-one-third' />
                  <div className='field'>
                    <label className='label'>First Name</label>
                    <div className='control'>
                      <input
                        className='input'
                        type='text'
                        placeholder='First Name'
                        name='firstName'
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
                      />
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
    </>
  )
}

export default Register
