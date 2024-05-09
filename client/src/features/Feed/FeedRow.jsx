import styled from "styled-components";
import ArtistCard from "../../components/ArtistCard.jsx";

const RowHeading = styled.h2`
  font-size: 2.4rem;
  color: #fff;
  font-weight: 600;
  margin-bottom: 0.6rem;
`;

const Row = styled.div`
  display: flex;
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
      <Row>
        {[1, 2, 3, 4, 5, 6].map(() => (
          <ArtistCard />
        ))}
      </Row>
    </div>
  );
};

export default FeedRow;
