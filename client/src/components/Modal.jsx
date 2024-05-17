import { createContext, useContext, useState } from "react";
import styled from "styled-components";
import { createPortal } from "react-dom";
import { RiCloseLine } from "react-icons/ri";

// Styled Components
const Overlay = styled.div`
  height: 100vh;
  width: 100vw;

  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  inset: 0 0;
  z-index: 9999;

  background-color: rgba(0, 0, 0, 0.5);
`;

const Body = styled.div`
  width: 52.4rem;
  padding: 2.4rem;
  position: relative;

  color: #fff;
  background-color: #282828;
  border-radius: 8px;
`;

const Title = styled.h2`
  margin-bottom: 2.4rem;
  font-size: 2.4rem;
  font-weight: 600;
`;

const Button = styled.button`
  height: 3.2rem;
  width: 3.2rem;

  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 2.4rem;
  right: 2.4rem;

  background: transparent;
  border-radius: 5rem;
  cursor: pointer;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  &:active {
    background: rgba(255, 255, 255, 0.2);
  }
`;

const CloseButton = styled(RiCloseLine)`
  font-size: 2.4rem;
  color: rgba(255, 255, 255, 0.7);
`;

// Compound Component
const ModalContext = createContext(null);

const Modal = ({ children }) => {
  const [modalName, setModalName] = useState("");

  const open = (name) => setModalName(name);
  const close = () => setModalName("");

  return (
    <ModalContext.Provider
      value={{
        modalName,
        open,
        close,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

const Open = ({ name }) => {
  const { modalName, open, close } = useContext(ModalContext);

  return <button onClick={() => open("playlist")}>Open</button>;
};

const Window = ({ name, children }) => {
  return createPortal(
    <Overlay>
      <Body>
        <Title>Edit Details</Title>
        <Button>
          <CloseButton role="button" />
        </Button>

        {children}
      </Body>
    </Overlay>,
    document.body,
  );
};

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
