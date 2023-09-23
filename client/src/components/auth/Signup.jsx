import "./Auth.scss";
import logo from "../../img/logo.svg";
import { Link, Navigate } from "react-router-dom";
import { signupUser } from "../../store/thunks/user";
import { useDispatch, useSelector } from "react-redux";

const Signup = (props) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const signup = (e) => {
    e.preventDefault();

    const name = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const passwordConfirm = e.target[3].value;

    dispatch(signupUser({ name, email, password, passwordConfirm }));
  };

  return (
    <>
      {!user.auth ? (
        <div className="auth">
          <form className="auth-form" onSubmit={signup}>
            <img className="auth-form__logo" src={logo} alt="" />
            <Link to="/login" className="auth-form__link">
              Log In here
            </Link>
            <input type="text" name="name" placeholder="Name" required />
            <input type="text" name="email" placeholder="Email" required />
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
            />
            <input
              type="password"
              name="passwordConfirm"
              placeholder="Password Confirm"
              required
            />
            <button type="submit">Sign Up</button>
          </form>
        </div>
      ) : (
        <Navigate to={"/"} />
      )}
    </>
  );
};

export default Signup;
