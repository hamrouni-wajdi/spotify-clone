import "./Profile.scss";
import { useSelector } from "react-redux";

const Profile = () => {
  const user = useSelector((state) => state.user.data);

  return (
    <div className="profile">
      <div className="profile__header">
        <div className="profile__photo">
          <img src={user.photo} alt="Avatar" />
        </div>
        <div className="profile__info">
          <span>Profile</span>
          <h1 className="profile__name">Maqsud Tolipov</h1>
          <span>35 Following</span>
        </div>
      </div>
    </div>
  );
};

export default Profile;
