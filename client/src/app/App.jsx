import './App.scss';
import userImg from './../img/user.png';

import { IoChevronBackOutline, IoChevronForwardOutline } from 'react-icons/io5';
import Header from './Header/Header';

import AuthContext from '../context/AuthProvider';
import { useContext } from 'react';

const App = (props) => {
  const { auth } = useContext(AuthContext);

  return (
    <div className='app'>
      <div className='app-nav'>
        <div className='app-nav__history'>
          <div className='app-nav__history-icon'>
            <IoChevronBackOutline />
          </div>
          <div className='app-nav__history-icon'>
            <IoChevronForwardOutline />
          </div>
        </div>
        <div className='app-nav__profile'>
          <img
            crossorigin='anonymous'
            src={auth.user.photo}
            alt=''
            className='app-nav__profile--img'
          />
        </div>
      </div>
      <Header />
    </div>
  );
};

export default App;
