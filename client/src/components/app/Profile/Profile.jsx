import "./Profile.scss";
import { useDispatch, useSelector } from "react-redux";
import { updatePassword, updateUser } from "../../../store/thunks/user";
import { useRef } from "react";

const Profile = () => {
  const user = useSelector((state) => state.user.data);
  const dispatch = useDispatch();

  const formInfoRef = useRef();
  const formPassRef = useRef();

  const formInfoHandler = (e) => {
    e.preventDefault();

    const formData = new FormData(formInfoRef.current);

    dispatch(updateUser(formData));
  };

  const formPassHandler = (e) => {
    e.preventDefault();

    const data = {
      currentPassword: e.target[0].value,
      password: e.target[1].value,
      passwordConfirm: e.target[2].value,
    };

    dispatch(updatePassword(data));
  };

  return (
    <>
      {user.name ? (
        <div className="profile">
          <div className="profile__header">
            <div className="profile__photo">
              <img src={user.photo} alt="Avatar" />
            </div>
            <div className="profile__info">
              <span>Profile</span>
              <h1 className="profile__name">{user.name}</h1>
              <span>{user.followedArtists.length} Following</span>
            </div>
          </div>
          <div className="profile__body">
            <div className="profile__form">
              <h2>Update your information</h2>
              <form ref={formInfoRef} onSubmit={formInfoHandler}>
                <label htmlFor="name">Name</label>
                <input type="text" name="name" placeholder={user.name} />
                <label htmlFor="email">Email</label>
                <input type="text" name="email" placeholder={user.email} />
                <label htmlFor="photo">Photo</label>
                <input type="file" name="photo" accept="image/*" />
                <button type="submit">Update</button>
              </form>
              <h2>Update your password</h2>
              <form ref={formPassRef} onSubmit={formPassHandler}>
                <label htmlFor="oldPassword">Old password</label>
                <input type="password" name="oldPassword" />
                <label htmlFor="newPassword">New password</label>
                <input type="password" name="newPassword" />
                <label htmlFor="confirmPassword">Confirm password</label>
                <input type="password" name="confirmPassword" />
                <button type="submit">Update</button>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <div>Really?? You are not logged in man!!</div>
      )}
    </>
  );
};

export default Profile;
