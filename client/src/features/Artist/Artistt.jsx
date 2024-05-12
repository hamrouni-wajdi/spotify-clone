import styled from "styled-components";
import badgeImg from "../../img/verify.png";
import PlayButton from "../../components/PlayButton.jsx";

const StyledArtist = styled.div``;

const Header = styled.header`
  height: 30rem;
  padding: 6.4rem 1.8rem 1.8rem 1.8rem;

  display: flex;
  flex-direction: column;

  color: #fff;
  background-image: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0),
      rgba(0, 0, 0, 0.1)
    ),
    url("https://images.unsplash.com/photo-1685521885212-e5fbac146446?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80");
  background-size: cover;
`;

const Verified = styled.div`
  margin-top: auto;

  display: flex;
  align-items: center;
  gap: 0.8rem;

  font-size: 1.4rem;

  img {
    height: 2.4rem;
  }
`;

const ArtistName = styled.h1`
  font-size: 9.6rem;
  font-weight: 800;
`;

const ListenersCount = styled.p`
  font-size: 1.6rem;
  line-height: 2;
  margin-top: 0.4rem;
`;

const Nav = styled.nav`
  padding: 1.8rem;

  display: flex;
  align-items: center;
  gap: 2.6rem;
`;

const FollowButton = styled.button`
  padding: 0.3rem 1.5rem;

  font-size: 1.4rem;
  font-weight: 600;
  line-height: 2.4rem;
  color: #fff;
  background: transparent;
  border: 1px solid #727272;
  border-radius: 5rem;

  transition: all 0.1s;

  &:hover {
    scale: 1.02;
    border-color: #fff;
  }

  &:active {
    scale: 1;
    color: #727272;
    border-color: #727272;
  }
`;

const Artistt = () => {
  return (
    <StyledArtist>
      <Header>
        <Verified>
          <img src={badgeImg} alt="Verified badge" />
          <span>Verified Artist</span>
        </Verified>

        <ArtistName>Coldplay</ArtistName>
        <ListenersCount>1938 listeners</ListenersCount>
      </Header>

      <Nav>
        <PlayButton size={5.6} iconSize={2.4} />
        <FollowButton>Follow</FollowButton>
      </Nav>
    </StyledArtist>
  );
};

export default Artistt;
