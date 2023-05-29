import axios from '../api/axios';
import { useEffect, useState, useContext } from 'react';

import './Auth.scss';
import logo from './../img/logo.svg';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthProvider';

const Signup = (props) => {
  const { setAuth } = useContext(AuthContext);
  const [sucess, setSuccess] = useState(false);

  const signup = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('/users/signup', {
        name: e.target[0].value,
        email: e.target[1].value,
        password: e.target[2].value,
        passwordConfirm: e.target[3].value,
      });

      const JWT = res.data.token;
      const role = res.data.data.user.role;

      setAuth({ JWT, role });

      localStorage.setItem('user', JSON.stringify(res.data.data));
      setSuccess(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='auth'>
      <form className='auth-form' onSubmit={signup}>
        <img className='auth-form__logo' src={logo} alt='' />
        <Link to='/login' className='auth-form__link'>
          Log In here
        </Link>
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
        {sucess && (
          <p>
            You are sucessfully signed up{' '}
            <Link to='/' className='auth-form__link'>
              Go to Home
            </Link>
          </p>
        )}
      </form>
    </div>
  );
};

export default Signup;
