import "./Auth.scss";
import logo from "../../img/logo.svg";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "../../store/thunks/user";
import { Link, Navigate, useParams } from "react-router-dom";

const Forgot = () => {
  // Redux
  const user = useSelector((state) => state.user.data);
  const dispatch = useDispatch();

  // Handlers
  const formSubmitHandler = (e) => {
    // console.log(id);
    e.preventDefault();

    const email = e.target[0].value;

    // dispatch(resetPassword({ id, password, passwordConfirm }));
    dispatch(forgotPassword({ email }));
  };

  return (
    <>
      {!user.auth ? (
        <div className="auth">
          <form className="auth-form" onSubmit={formSubmitHandler}>
            <img className="auth-form__logo" src={logo} alt="" />
            <input type="email" placeholder="Email" required />
            <button type="submit">Send token</button>
          </form>
        </div>
      ) : (
        <Navigate to={"/"} />
      )}
    </>
  );
};

export default Forgot;
