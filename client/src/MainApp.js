import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import './MainApp.scss';
import Nav from './nav/Nav';
import App from './app/App';
import Player from './player/Player';
import Auth from './auth/Auth';

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
        <Route path='/login' element={<Auth />} />
      </Routes>
    </BrowserRouter>
  );
}

export default MainApp;
