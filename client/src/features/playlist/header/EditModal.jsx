import styled, { css } from "styled-components";
import { useSelector } from "react-redux";
import { selectPlaylist } from "../playlistSlice.js";
import { RiPencilLine } from "react-icons/ri";

const FormGrid = styled.form`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 1.6rem;
`;

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

const InputGrid = styled.div`
  display: flex;
  flex-direction: column;
`;

const InputField = styled.div`
  position: relative;

  &:nth-child(2) {
    height: 100%;
  }
`;

const Label = styled.label`
  position: absolute;
  left: 1rem;
  translate: 0 -50%;

  font-size: 1.2rem;
  font-weight: 600;

  opacity: 0;
  transition: opacity 0.2s;
`;

const InputStyles = css`
  width: 100%;

  font-family: inherit;
  font-size: 1.4rem;
  color: #fff;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  border: 1px solid transparent;

  &:focus {
    background-color: #333;
    border: 1px solid #535353;
    outline: none;

    & + label {
      opacity: 1;
    }
  }
`;

const StyledInput = styled.input`
  ${InputStyles}; // Extends InputStyles

  height: 4rem;
  padding: 0 1.2rem;
  margin-bottom: 1.6rem;
`;

const StyledTextarea = styled.textarea`
  ${InputStyles}; // Extends InputStyles

  height: 100%;
  padding: 1.2rem 1.2rem 2.8rem 1.2rem;
  resize: none;
`;

const EditModal = () => {
  const playlist = useSelector(selectPlaylist);

  return (
    <div>
      <form>
        <FormGrid>
          <ImgField>
            <label htmlFor="img">
              <StyledCover>
                <Img src={playlist.img} alt="playlist cover" />
                <PencilIcon />
              </StyledCover>
            </label>
            <input type="file" id="img" />
          </ImgField>

          <InputGrid>
            <InputField>
              <StyledInput type="text" />
              <Label>Name</Label>
            </InputField>
            <InputField>
              <StyledTextarea />
              <Label>Description</Label>
            </InputField>
          </InputGrid>
        </FormGrid>
      </form>
    </div>
  );
};

export default EditModal;
