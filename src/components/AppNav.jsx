import React from 'react'
import { NavLink } from 'react-router-dom'

export const AppNav = () => {
  return (
    <>
      <section className='app-nav'>
        <nav>
          <NavLink activeClassName='active' to='/'>
            <button>
              <i className='fa-solid fa-house'></i>
            </button>
          </NavLink>
          <NavLink activeClassName='active' to='/code'>
            <button>
              <i className='fa-solid fa-code'></i>
            </button>
          </NavLink>
          <NavLink activeClassName='active' to='/about'>
            <button>About</button>
          </NavLink>
        </nav>
      </section>
    </>
  )
}
