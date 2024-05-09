import Nav from "../../layout/Nav/Nav.jsx";
import styled from "styled-components";

const StyledApp = styled.div`
  height: 100%;
  margin-top: 0.8rem;
  margin-right: 0.8rem;

  position: relative;
  overflow-y: scroll;

  background-color: var(--color-black);
  border-radius: 8px;
`;

const App = ({ children }) => {
  return (
    <StyledApp>
      <Nav />

      {children}
    </StyledApp>
  );
};

export default App;
