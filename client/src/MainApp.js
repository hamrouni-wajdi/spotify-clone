import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import './MainApp.scss';
import Nav from './nav/Nav';
import App from './app/App';
import Player from './player/Player';
import Login from './auth/Login';
import Signup from './auth/Signup';

function MainApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={
            <div className='main-app'>
              <Nav />
              <App />
              <Player />
            </div>
          }
        />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default MainApp;
