import { cloneElement, createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import styled, { css } from "styled-components";
import useOutsideClick from "../hooks/useOutsideClick.js";

const StyledBody = styled.div`
  position: absolute;
  top: ${({ position }) => position.top + 8}px;
  right: ${({ position }) => position.right}px;
  z-index: 1000;

  background-color: rgb(40, 40, 40);
  border-radius: 4px;
  box-shadow: 0 16px 24px 0 rgba(0, 0, 0, 0.3);
`;

const StyledList = styled.ul`
  width: 24rem;
  padding: 0.4rem;

  color: #fff;
`;

const StyledItem = styled.li`
  padding: 1.2rem;

  display: flex;
  align-items: center;
  gap: 1.2rem;

  font-size: 1.4rem;
  border-radius: 0.2rem;
  cursor: pointer;

  svg {
    font-size: 1.6rem;
    color: var(--color-text-sub);
  }

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  ${({ $underline }) =>
    $underline &&
    css`
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    `}
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
      <StyledList>{children}</StyledList>
    </StyledBody>,
    document.body,
  );
};

const List = ({ children }) => {
  return <StyledList>{children}</StyledList>;
};

const Item = ({ children }) => {
  return <StyledItem>{children}</StyledItem>;
};

Menu.Open = Open;
Menu.Body = Body;
Menu.Item = Item;

export default Menu;
