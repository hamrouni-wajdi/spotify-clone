import { cloneElement, createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import useOutsideClick from "../hooks/useOutsideClick.js";

const StyledBody = styled.div`
  position: absolute;
  top: ${({ position }) => position.top + 8}px;
  right: ${({ position }) => position.right}px;

  background-color: rgb(40, 40, 40);
  border-radius: 4px;
  box-shadow: 0 16px 24px 0 rgba(0, 0, 0, 0.3);
`;

const MenuContext = createContext(null);

const Menu = ({ children }) => {
  const [menuName, setMenuName] = useState("");
  const [position, setPosition] = useState();

  const openMenu = (name) => setMenuName(name);
  const closeMenu = () => setMenuName("");

  return (
    <MenuContext.Provider
      value={{ menuName, position, openMenu, closeMenu, setPosition }}
    >
      {children}
    </MenuContext.Provider>
  );
};

const Open = ({ name, children }) => {
  const { menuName, openMenu, closeMenu, setPosition } =
    useContext(MenuContext);

  const handleClick = (e) => {
    e.stopPropagation();

    const viewportWidth = document.documentElement.clientWidth;
    const el = e.target.getBoundingClientRect();

    setPosition({
      right: viewportWidth - el.right,
      top: el.bottom,
    });

    menuName === "" || menuName !== name ? openMenu(name) : closeMenu();
  };

  return cloneElement(children, { onClick: (e) => handleClick(e) });
};

const Body = ({ name, children }) => {
  const { menuName, position, closeMenu } = useContext(MenuContext);
  const { ref } = useOutsideClick(closeMenu);

  if (name !== menuName) return null;

  return createPortal(
    <StyledBody ref={ref} position={position}>
      {children}
    </StyledBody>,
    document.body,
  );
};

Menu.Open = Open;
Menu.Body = Body;

export default Menu;
