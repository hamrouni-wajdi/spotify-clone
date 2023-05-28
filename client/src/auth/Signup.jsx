import axios from '../api/axios';

import './Auth.scss';
import logo from './../img/logo.svg';
import { useEffect, useState } from 'react';

const Signup = (props) => {
  const signup = async (e) => {
    e.preventDefault();
    console.log(e);

    try {
      const res = await axios.post('/users/signup', {
        name: e.target[0].value,
        email: e.target[1].value,
        password: e.target[2].value,
        passwordConfirm: e.target[3].value,
      });
      localStorage.setItem('user', JSON.stringify(res.data.data));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='auth'>
      <form className='auth-form' onSubmit={signup}>
        <img className='auth-form__logo' src={logo} alt='' />
        <p className='auth-form__link'>Log In here</p>
        <input type='text' name='name' placeholder='Name' required />
        <input type='text' name='email' placeholder='Email' required />
        <input type='text' name='password' placeholder='Password' required />
        <input
          type='text'
          name='passwordConfirm'
          placeholder='Password Confirm'
          required
        />
        <button type='submit'>Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
