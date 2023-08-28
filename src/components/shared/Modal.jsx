import PropTypes from "prop-types";
import { useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";

const Modal = ({ children, show, setShow }) => {
  const handleEscapeKeyPress = (event) => {
    if (event.key === "Escape") {
      setShow(false);
    }
  };

  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      setShow(false);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleEscapeKeyPress);
    return () => {
      document.removeEventListener("keydown", handleEscapeKeyPress);
    };
  }, []);

  return (
    <div
      onClick={handleBackdropClick}
      className={` ${
        !show && "hidden"
      }  opacity-100 fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity `}
    >
      <button
        onClick={() => setShow(false)}
        className="absolute right-4 top-4 "
      >
        <AiOutlineClose size={30} color="#fff" />
      </button>
      {children}
    </div>
  );
};

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  show: PropTypes.bool.isRequired,
  setShow: PropTypes.func.isRequired,
};

export default Modal;
