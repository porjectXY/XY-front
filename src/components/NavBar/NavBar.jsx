import { useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '@/assets/medios.png'

const NavBar = () => {
  const [isActive, setIsActive] = useState(false)

  const toggleBurgerMenu = () => {
    setIsActive(!isActive)
  }

  return (
    <nav className='navbar' role='navigation' aria-label='main navigation'>
      <div className='navbar-brand'>
        <a className='navbar-item' href='/'>
          <img src={logo} alt='Logo' width='35' height='110' />
        </a>
        <a
          role='button'
          className={`navbar-burger ${isActive ? 'is-active' : ''}`}
          aria-label='menu'
          aria-expanded='false'
          onClick={toggleBurgerMenu}
        >
          <span aria-hidden='true' />
          <span aria-hidden='true' />
          <span aria-hidden='true' />
        </a>
      </div>

      <div id='navbarBasicExample' className={`navbar-menu ${isActive ? 'is-active' : ''}`}>
        <div className='navbar-start'>
          <Link className='navbar-item' to='/'>
            Feed
          </Link>
          <a className='navbar-item' href='/documentation'>
            Documentation
          </a>
          <div className='navbar-item has-dropdown is-hoverable'>
            <a className='navbar-link' href='#'>
              More
            </a>
            <div className='navbar-dropdown'>
              <a className='navbar-item' href='/about'>
                About
              </a>
              <a className='navbar-item is-selected' href='/jobs'>
                Jobs
              </a>
              <a className='navbar-item' href='/contact'>
                Contact
              </a>
              <hr className='navbar-divider' />
              <a className='navbar-item' href='/report'>
                Report an issue
              </a>
            </div>
          </div>
        </div>

        <div className='navbar-end'>
          <div className='navbar-item'>
            <div className='buttons'>
              <Link className='button is-primary' to='/register'>
                <strong>Register</strong>
              </Link>
              <Link className='button is-light' to='/login'>
                Log in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default NavBar
