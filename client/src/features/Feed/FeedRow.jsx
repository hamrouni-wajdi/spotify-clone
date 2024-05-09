import styled from "styled-components";
import ArtistCard from "../../components/ArtistCard.jsx";
import PlaylistCard from "../../components/PlaylistCard.jsx";

const RowHeading = styled.h2`
  font-size: 2.4rem;
  color: #fff;
  font-weight: 600;
  margin-bottom: 0.6rem;
`;

const Row = styled.div`
  display: flex;

  //  TEMP
  margin-bottom: 4rem;
`;

const FeedRow = () => {
  return (
    <div>
      <RowHeading>Your Favourite Artists</RowHeading>
      <Row>
        {[1, 2, 3, 4, 5, 6].map(() => (
          <ArtistCard />
        ))}
      </Row>
      <RowHeading>Top Playlists for you</RowHeading>
      <Row>
        {[1, 2, 3, 4, 5, 6].map(() => (
          <PlaylistCard />
        ))}
      </Row>
    </div>
  );
};

export default FeedRow;
