import "./App.scss";

import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";

const App = (props) => {
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
      </div>
    </div>
  );
};

export default App;
