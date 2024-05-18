import styled, { css } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { selectPlaylist } from "../playlistSlice.js";
import { RiPencilLine } from "react-icons/ri";
import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import { updatePlaylist } from "../../../store/thunks/playlist.js";

const FormGrid = styled.div`
  margin-bottom: 0.8rem;

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

  object-fit: cover;
  object-position: center;
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

const FormButton = styled.button`
  height: 4.8rem;
  padding: 0 3.2rem;

  display: block;
  margin-left: auto;

  font-size: 1.6rem;
  font-weight: 600;
  background: #fff;
  border-radius: 5rem;

  transition: all 0.1s;

  &:hover {
    background: #f6f6f6;
    scale: 1.04;
  }

  &:active {
    background: #b7b7b7;
    scale: 1;
  }
`;

const EditModal = () => {
  const playlist = useSelector(selectPlaylist);
  const { register, handleSubmit, control } = useForm();
  const [imgFile, setImgFile] = useState("");
  const dispatch = useDispatch();

  const handleChangeImg = (e, onChange) => {
    onChange(e.target.files[0]);
    setImgFile(URL.createObjectURL(e.target.files[0]));
  };

  // TODO: Server should remove old images
  const onSubmit = (data) => {
    const formData = new FormData();

    formData.append("img", data.img);
    formData.append("name", data.name);
    formData.append("description", data.description);

    dispatch(updatePlaylist({ data: formData, id: playlist.id }));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormGrid>
        <ImgField>
          <label htmlFor="img">
            <StyledCover>
              <Img src={imgFile || playlist.img} alt="playlist cover" />
              <PencilIcon />
            </StyledCover>
          </label>
          <Controller
            control={control}
            name="img"
            render={({ field: { value, onChange, ...field } }) => (
              <input
                type="file"
                id="img"
                onChange={(e) => handleChangeImg(e, onChange)}
                {...field}
              />
            )}
          />
        </ImgField>

        <InputGrid>
          <InputField>
            <StyledInput
              type="text"
              defaultValue={playlist.name}
              placeholder="Add a name"
              {...register("name")}
            />
            <Label>Name</Label>
          </InputField>
          <InputField>
            <StyledTextarea
              defaultValue={playlist.description}
              placeholder="Add an optional description"
              {...register("description")}
            />
            <Label>Description</Label>
          </InputField>
        </InputGrid>
      </FormGrid>

      <FormButton type="submit">Save</FormButton>
    </form>
  );
};

export default EditModal;
