import styled from "styled-components";
import { useSelector } from "react-redux";
import { selectPlaylist } from "../playlistSlice.js";
import { RiPencilLine } from "react-icons/ri";

const ImgField = styled.div`
  input {
    display: none;
  }
`;

// TODO: Make separate component
const StyledCover = styled.div`
  height: 18rem;
  width: 18rem;

  position: relative;
  overflow: hidden;

  border-radius: 4px;
  box-shadow: 0 4px 6rem rgba(0, 0, 0, 0.5);
  cursor: pointer;

  input {
    display: none;
  }

  &:hover {
    svg {
      display: inline-block;
    }

    img {
      filter: brightness(70%);
    }
  }
`;

const PencilIcon = styled(RiPencilLine)`
  display: none;
  position: absolute;
  top: 50%;
  left: 50%;
  translate: -50% -50%;
  z-index: 1000;

  font-size: 6rem;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
`;

const EditModal = () => {
  const playlist = useSelector(selectPlaylist);

  return (
    <div>
      <form>
        <ImgField>
          <label htmlFor="img">
            <StyledCover>
              <Img src={playlist.img} alt="playlist cover" />
              <PencilIcon />
            </StyledCover>
          </label>
          <input type="file" id="img" />
        </ImgField>
      </form>
    </div>
  );
};

export default EditModal;
