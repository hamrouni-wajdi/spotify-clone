import "./Profile.scss";
import { useSelector } from "react-redux";

const Profile = () => {
  const user = useSelector((state) => state.user.data);

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
          <div className="profile__body">I am here</div>
        </div>
      ) : (
        <div>Really?? You are not logged in man!!</div>
      )}
    </>
  );
};

export default Profile;
