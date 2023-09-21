import "./Auth.scss";
import logo from "../../img/logo.svg";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../../store/thunks/user";
import { Link, Navigate, useParams } from "react-router-dom";

const Reset = (props) => {
  // Redux
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // Router
  const { id } = useParams();

  const formSubmitHandler = (e) => {
    console.log(id);
    e.preventDefault();

    const password = e.target[0].value;
    const passwordConfirm = e.target[1].value;

    dispatch(resetPassword({ id, password, passwordConfirm }));
  };

  return (
    <>
      {!user.auth ? (
        <div className="auth">
          <form className="auth-form" onSubmit={formSubmitHandler}>
            <img className="auth-form__logo" src={logo} alt="" />
            <input type="text" placeholder="Password" required />
            <input type="text" placeholder="Confirm Password" required />
            <button type="submit">Update password</button>
          </form>
        </div>
      ) : (
        <Navigate to={"/"} />
      )}
    </>
  );
};

export default Reset;
