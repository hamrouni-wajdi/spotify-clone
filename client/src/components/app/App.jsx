import "./App.scss";

import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";
import { useSelector } from "react-redux";

const App = (props) => {
  const { data } = useSelector((state) => state.user);

  return (
    <div className="app">
      <div className="app-nav">
        <div className="app-nav__history">
          <div className="app-nav__history-icon">
            <IoChevronBackOutline />
          </div>
          <div className="app-nav__history-icon">
            <IoChevronForwardOutline />
          </div>
        </div>
        <div className="app-nav__profile">
          <img
            crossOrigin="anonymous"
            src={data.img}
            alt=""
            className="app-nav__profile--img"
          />
        </div>
      </div>
      {/*<Home />*/}
      {/*<Artist />*/}
      {props.children}
    </div>
  );
};

export default App;
