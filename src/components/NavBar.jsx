import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
  return (
    <header className="header">
      <NavLink exact to="/" className="w-40 h-10 rounded-lg bg-white flex items-center justify-center font-bold shadow-md">
        <p className='blue-gradient_text'>DEEPAK</p>
      </NavLink>
      <nav className="flex text-lg gap-7 font-medium">
        <NavLink to='/about' className={({ isActive }) => isActive ? 'text-blue-400' : 'text-black'}>
          About
        </NavLink>
        <NavLink to='/projects' className={({ isActive }) => isActive ? 'text-blue-400' : 'text-black'}>
          Projects
        </NavLink>
        {/* <NavLink to='/hire-me' className={({isActive})=>isActive ? 'text-blue-400':'text-black'}>
        Hire Me
        </NavLink>
        <NavLink to='/contact' className={({isActive})=>isActive ? 'text-blue-400':'text-black'}>
        Contact
        </NavLink> */}
      </nav>
    </header>
  );
}

export default NavBar;
