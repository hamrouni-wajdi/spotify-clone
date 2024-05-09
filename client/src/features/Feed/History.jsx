import styled from "styled-components";
import { RiPlayFill } from "react-icons/ri";

const StyledHistory = styled.div`
  margin-bottom: 4rem;

  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.8rem;
`;

const Card = styled.div`
  height: 4.8rem;
  padding-right: 0.8rem;

  display: flex;
  align-items: center;
  gap: 0.8rem;
  overflow: hidden;

  background-color: rgba(255, 255, 255, 0.07);
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.5s;

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);

    button {
      opacity: 1;
    }
  }
`;

const CardImg = styled.img`
  height: 100%;
`;

const CardName = styled.span`
  flex-grow: 1;
  font-size: 1.4rem;
  font-weight: 600;
  color: #fff;
`;

const PlayButton = styled.button`
  height: 3.2rem;
  width: 3.2rem;

  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;

  background: var(--color-brand);
  box-shadow: 0 8px 8px rgba(0, 0, 0, 0.3);
  border-radius: 5rem;

  svg {
    font-size: 1.6rem;
  }

  &:hover {
    scale: 1.05;
  }

  &:active {
    background-color: var(--color-brand-press);
    scale: 1;
  }
`;

const History = ({ setGradientColor }) => {
  return (
    <StyledHistory>
      <Card onMouseEnter={() => setGradientColor("#ef4444")}>
        <CardImg src="https://ik.imagekit.io/8cs4gpobr/spotify/users/user-6519566c4be72b587b795192-1696159508277__JdgJejgj.jpeg" />
        <CardName>Billie Eilish</CardName>
        <PlayButton>
          <RiPlayFill />
        </PlayButton>
      </Card>
      <Card onMouseEnter={() => setGradientColor("#eab308")}>
        <CardImg src="https://ik.imagekit.io/8cs4gpobr/spotify/users/user-6519566c4be72b587b795192-1696159508277__JdgJejgj.jpeg" />
        <CardName>Billie Eilish</CardName>
        <PlayButton>
          <RiPlayFill />
        </PlayButton>
      </Card>
      <Card onMouseEnter={() => setGradientColor("#22c55e")}>
        <CardImg src="https://ik.imagekit.io/8cs4gpobr/spotify/users/user-6519566c4be72b587b795192-1696159508277__JdgJejgj.jpeg" />
        <CardName>Billie Eilish</CardName>
        <PlayButton>
          <RiPlayFill />
        </PlayButton>
      </Card>{" "}
      <Card onMouseEnter={() => setGradientColor("#737373")}>
        <CardImg src="https://ik.imagekit.io/8cs4gpobr/spotify/users/user-6519566c4be72b587b795192-1696159508277__JdgJejgj.jpeg" />
        <CardName>Billie Eilish</CardName>
        <PlayButton>
          <RiPlayFill />
        </PlayButton>
      </Card>{" "}
      <Card onMouseEnter={() => setGradientColor("#06b6d4")}>
        <CardImg src="https://ik.imagekit.io/8cs4gpobr/spotify/users/user-6519566c4be72b587b795192-1696159508277__JdgJejgj.jpeg" />
        <CardName>Billie Eilish</CardName>
        <PlayButton>
          <RiPlayFill />
        </PlayButton>
      </Card>
      <Card onMouseEnter={() => setGradientColor("#3b82f6")}>
        <CardImg src="https://ik.imagekit.io/8cs4gpobr/spotify/users/user-6519566c4be72b587b795192-1696159508277__JdgJejgj.jpeg" />
        <CardName>Billie Eilish</CardName>
        <PlayButton>
          <RiPlayFill />
        </PlayButton>
      </Card>
    </StyledHistory>
  );
};

export default History;
