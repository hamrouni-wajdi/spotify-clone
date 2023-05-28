import axios from './../api/axios';

import './Auth.scss';
import logo from './../img/logo.svg';
import { useEffect, useState } from 'react';

const Auth = (props) => {
  const [user, setUser] = useState();

  const login = async (e) => {
    e.preventDefault();
    console.log(e);

    try {
      const res = await axios.post('/users/login', {
        email: e.target[0].value,
        password: e.target[1].value,
      });
      console.log(res);
      setUser(res);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='auth'>
      <form className='auth-form' onSubmit={login}>
        <img className='auth-form__logo' src={logo} alt='' />
        <input type='text' placeholder='Email' required />
        <input type='text' placeholder='Password' required />
        <button type='submit'>Log In</button>
      </form>
    </div>
  );
};

export default Auth;
