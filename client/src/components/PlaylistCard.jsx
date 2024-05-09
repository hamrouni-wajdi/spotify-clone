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
  border-radius: 6px;
`;

const Name = styled.p`
  margin-bottom: 0.4rem;
  font-size: 1.6rem;
  color: #fff;
`;

const Description = styled.p`
  font-size: 1.4rem;
  color: var(--color-text-sub);
`;

const ArtistCard = () => {
  return (
    <StyledCard>
      <Img src="https://ik.imagekit.io/8cs4gpobr/spotify/playlists/playlist-65ae756987219cb71d711d73-1705932237921_GETr42FNd.jpeg" />
      <Name>Best of Taylor</Name>
      <Description>Top streamed songs of Taylor Swift</Description>
    </StyledCard>
  );
};

export default ArtistCard;
