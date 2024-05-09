import "./App.scss";
import Nav from "../../layout/Nav/Nav.jsx";

const App = (props) => {
  return (
    <div className="app">
      <Nav />

      {props.children}
    </div>
  );
};

export default App;
