import React, { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { useAuthContext } from '@/hooks/useAuthContext'
import './header.scss'

const Header = () => {
  const { isAuth, logout } = useAuthContext()
  const [isMenuOpen, setMenuOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const location = useLocation()

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen)
  }

  const linkIsActive = (isActive) => {
    return isActive ? 'header__item-link header__item-link--is-active' : 'header__item-link'
  }

  const handleSearchChange = (item) => {
    setSearchTerm(item.target.value)
  }

  const shouldShowSearch = location.pathname === '/'

  return (
    <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
      <div className='container'>
        <NavLink className='navbar-brand' to='/'>
          <img
            src='https://i.pinimg.com/564x/00/f0/67/00f067b4169d3903e30af3051b8087af.jpg'
            alt='LOGO'
            style={{ width: '100px', height: '100px', borderRadius: '100px' }}
          />
        </NavLink>
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarNav'
          aria-controls='navbarNav'
          aria-expanded={isMenuOpen}
          aria-label='Toggle navigation'
          onClick={toggleMenu}
        >
          <span className='navbar-toggler-icon' />
        </button>
        {shouldShowSearch && (
          <div className='input-group'>
            <input
              style={{
                color: 'blue',
                borderRadius: '60px',
                border: 'none',
                background: 'aliceBlue',
                height: '40px',
                padding: '10px 20px',
                marginRight: '10px'
              }}
              type='search'
              placeholder='Buscar productos...'
              value={searchTerm}
              onChange={handleSearchChange}
              name=''
              id=''
            />
            <NavLink to={`/search/${searchTerm}`} style={{ textDecoration: 'none' }}>
              <div className='input-group-append'>
                <button className='btn btn-success' type='button' style={{ height: '40px' }}>
                  Buscar
                </button>
              </div>
            </NavLink>
          </div>
        )}
        <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`} id='navbarNav' style={{ justifyContent: 'flex-end' }}>
          <ul className='navbar-nav ml-auto' style={{ display: 'grid', justifyContent: 'center', textAlign: 'center' }}>
            <li className='nav-item'>
              <NavLink
                className={`nav-link ${linkIsActive(isMenuOpen ? false : undefined)}`}
                to='/'
                onClick={() => setMenuOpen(false)}
              >
                Home
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink
                className={`nav-link ${linkIsActive(isMenuOpen ? false : undefined)}`}
                to='/dashboard'
                onClick={() => setMenuOpen(false)}
              >
                Dashboard
              </NavLink>
            </li>
            {isAuth
              ? (
                <>
                  <li className='nav-item'>
                    <NavLink
                      className={`nav-link ${linkIsActive(isMenuOpen ? false : undefined)}`}
                      to='/secret'
                      onClick={() => setMenuOpen(false)}
                    >
                      Secret
                    </NavLink>
                  </li>
                  <li className='nav-item'>
                    <NavLink className='nav-link' to='/' onClick={logout}>
                      Logout
                    </NavLink>
                  </li>
                </>
                )
              : (
                <>
                  <li className='nav-item'>
                    <NavLink
                      className={`nav-link ${linkIsActive(isMenuOpen ? false : undefined)}`}
                      to='/login'
                      onClick={() => setMenuOpen(false)}
                    >
                      Login
                    </NavLink>
                  </li>
                  <li className='nav-item'>
                    <NavLink
                      className={`nav-link ${linkIsActive(isMenuOpen ? false : undefined)}`}
                      to='/signup'
                      onClick={() => setMenuOpen(false)}
                    >
                      Signup
                    </NavLink>
                  </li>
                </>
                )}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Header
