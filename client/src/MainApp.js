import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./MainApp.scss";
import Nav from "./components/nav/Nav";
import App from "./components/app/App";
import Player from "./components/player/Player";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { isLoggedIn } from "./store/thunks/user";
import Loading from "./components/UI/Loading";

function MainApp() {
  const [loading, setLoading] = useState(true);

  // Redux
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(isLoggedIn());
  }, []);

  useEffect(() => {
    console.log(user);
    if (user.auth === true) {
      setLoading(false);
    }
  }, [user]);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            loading ? (
              <Loading />
            ) : (
              <div className="main-app">
                <Nav />
                <App />
                <Player />
              </div>
            )

            // <Navigate to='/login' />
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default MainApp;
