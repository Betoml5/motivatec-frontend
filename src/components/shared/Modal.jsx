import PropTypes from "prop-types";
import { AiOutlineClose } from "react-icons/ai";

const Modal = ({ children, show, setShow }) => {
  return (
    <div
      className={` ${
        !show && "hidden"
      }  opacity-100 fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity`}
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
