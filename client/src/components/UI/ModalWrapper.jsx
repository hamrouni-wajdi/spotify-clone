import "./ModalWrapper.scss";
import { IoCloseCircle } from "react-icons/io5";
import { useRef } from "react";

const ModalWrapper = ({
  heading,
  open = false,
  type = "",
  handleClose,
  children,
}) => {
  const modalRef = useRef();

  return (
    <dialog
      className={`modal-wrapper ${type ? "modal-wrapper--" + type : null}`}
      ref={modalRef}
      open={open}
    >
      <header className="modal-wrapper__header">
        <h2>{heading}</h2>
        <IoCloseCircle className="modal-wrapper__close" onClick={handleClose} />
      </header>
      {children}
    </dialog>
  );
};

export default ModalWrapper;
