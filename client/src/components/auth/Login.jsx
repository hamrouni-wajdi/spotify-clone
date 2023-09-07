import "./Auth.scss";
import logo from "../../img/logo.svg";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../store/thunks/user";
import { Link, Navigate } from "react-router-dom";

const Login = (props) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const login = (e) => {
    e.preventDefault();

    const email = e.target[0].value;
    const password = e.target[1].value;

    dispatch(loginUser({ email, password }));
  };

  return (
    <>
      {!user.auth ? (
        <div className="auth">
          <form className="auth-form" onSubmit={login}>
            <img className="auth-form__logo" src={logo} alt="" />
            <Link to="/signup" className="auth-form__link">
              Sign Up here
            </Link>
            <input type="text" placeholder="Email" required />
            <input type="text" placeholder="Password" required />
            <button type="submit">Log In</button>
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
      ) : (
        <Navigate to={"/"} />
      )}
    </>
  );
};

export default Login;
