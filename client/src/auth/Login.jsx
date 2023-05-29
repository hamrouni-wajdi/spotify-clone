import axios from '../api/axios';

import './Auth.scss';
import logo from './../img/logo.svg';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Login = (props) => {
  const login = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('/users/login', {
        email: e.target[0].value,
        password: e.target[1].value,
      });
      localStorage.setItem('user', JSON.stringify(res.data.data));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='auth'>
      <form className='auth-form' onSubmit={login}>
        <img className='auth-form__logo' src={logo} alt='' />
        <Link to='/signup' className='auth-form__link'>
          Sign Up here
        </Link>
        <input type='text' placeholder='Email' required />
        <input type='text' placeholder='Password' required />
        <button type='submit'>Log In</button>
      </form>
    </div>
  );
};

export default Login;
