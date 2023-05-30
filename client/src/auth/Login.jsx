import axios from '../api/axios';

import './Auth.scss';
import logo from './../img/logo.svg';
import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';

const Login = (props) => {

  // const login = async (e) => {
  //   e.preventDefault();
  //
  //   try {
  //     const res = await axios.post('/users/login', {
  //       email: e.target[0].value,
  //       password: e.target[1].value,
  //     });
  //
  //     const JWT = res.data.token;
  //     const user = res.data.data.user;
  //
  //     setAuth({ JWT, user });
  //
  //     localStorage.setItem('user', JSON.stringify(res.data.data));
  //     setSuccess(true);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  return (
    <div className='auth'>
      <form className='auth-form' onSubmit={''}>
        <img className='auth-form__logo' src={logo} alt='' />
        <Link to='/signup' className='auth-form__link'>
          Sign Up here
        </Link>
        <input type='text' placeholder='Email' required />
        <input type='text' placeholder='Password' required />
        <button type='submit'>Log In</button>
        {/*{sucess && (*/}
        {/*  <p>*/}
        {/*    You are sucessfully logged in{' '}*/}
        {/*    <Link to='/' className='auth-form__link'>*/}
        {/*      Go to Home*/}
        {/*    </Link>*/}
        {/*  </p>*/}
        {/*)}*/}
      </form>
    </div>
  );
};

export default Login;
