import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Navigate,
  redirect,
} from 'react-router-dom';
import { useContext } from 'react';

import './MainApp.scss';
import Nav from './nav/Nav';
import App from './app/App';
import Player from './player/Player';
import Login from './auth/Login';
import Signup from './auth/Signup';
import AuthContext from './context/AuthProvider';

function MainApp() {
  const { auth } = useContext(AuthContext);

  if (!auth.JWT) redirect('/login');

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={
            auth.JWT ? (
              <div className='main-app'>
                <Nav />
                <App />
                <Player />
              </div>
            ) : (
              <Navigate to='/login' />
            )
          }
        />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default MainApp;
