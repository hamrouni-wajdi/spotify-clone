import "./App.scss";
import Nav from "../../layout/Nav/Nav.jsx";

const App = ({ children }) => {
  return (
    <div className="app">
      <Nav />

      {children}
    </div>
  );
};

export default App;
