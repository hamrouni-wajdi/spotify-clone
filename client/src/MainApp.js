import "./MainApp.scss";
import Nav from "./nav/Nav";
import App from "./app/App";
import Player from "./player/Player";

function MainApp() {
  return (
    <div className="main-app">
      <Nav />
      <App />
      <Player />
    </div>
  );
}

export default MainApp;
