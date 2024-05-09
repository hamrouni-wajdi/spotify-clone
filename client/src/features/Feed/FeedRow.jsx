import styled from "styled-components";
import SongCard from "../../components/Card/SongCard.jsx";

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

const FeedRow = ({ title, list, type }) => {
  return (
    <div>
      <RowHeading>{title}</RowHeading>
      {/*<Row>*/}
      {/*  {list.map(() => (*/}
      {/*    <ArtistCard />*/}
      {/*  ))}*/}
      {/*</Row>*/}

      {type === "song" && (
        <Row>
          {list.map((el) => (
            <SongCard data={el} />
          ))}
        </Row>
      )}

      {/*<RowHeading>Top Playlists for you</RowHeading>*/}
      {/*<Row>*/}
      {/*  {[1, 2, 3, 4, 5].map(() => (*/}
      {/*    <PlaylistCard />*/}
      {/*  ))}*/}
      {/*</Row>*/}
    </div>
  );
};

export default FeedRow;
