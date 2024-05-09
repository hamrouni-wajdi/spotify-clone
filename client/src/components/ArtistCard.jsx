import styled from "styled-components";

const StyledCard = styled.div`
  padding: 1.2rem;
  flex: 1;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background-color: var(--color-highlight);
  }
`;

const Img = styled.img`
  width: 100%;
  margin-bottom: 0.8rem;
  border-radius: 50rem;
`;

const Name = styled.p`
  margin-bottom: 0.4rem;
  font-size: 1.6rem;
  color: #fff;
`;

const Role = styled.p`
  font-size: 1.4rem;
  color: var(--color-text-sub);
`;

const ArtistCard = () => {
  return (
    <StyledCard>
      <Img src="https://randomuser.me/api/portraits/men/81.jpg" />
      <Name>Bryan Gonzales</Name>
      <Role>Artist</Role>
    </StyledCard>
  );
};

export default ArtistCard;
