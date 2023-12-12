import "./Auth.scss";
import logo from "../../img/logo.svg";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../store/thunks/user";
import { Link, Navigate } from "react-router-dom";
import { useState } from "react";

const Login = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    dispatch(loginUser({ email, password }));
  };

  return (
    <>
      {!user.auth ? (
        <div className="auth">
          <form className="auth__form" onSubmit={handleLogin}>
            <img className="auth__form-logo" src={logo} alt="Spotify logo" />
            <Link to="/signup" className="auth__form-link">
              Sign Up here
            </Link>
            <input
              type="text"
              placeholder="Email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              minLength="8"
              maxLength="16"
              placeholder="Password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <Link to="/forgotPassword" className="auth__form-link">
              Forgot password?
            </Link>
            <button type="submit">Log In</button>
          </form>
        </div>
      ) : (
        <Navigate to={"/"} />
      )}
    </>
  );
};

export default Login;
