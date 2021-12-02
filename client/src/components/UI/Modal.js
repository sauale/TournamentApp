import "./Modal.css";

const Modal = (props) => {
  return (
    <div>
      <div className="backdrop" onClick={props.onCloseLoginHandler}>
        hhhhhhhhhhhhhhhhhhhhhhhhhhhhh
      </div>

      <div className="modal">
        <div>{props.children}</div>
      </div>
    </div>
  );
};

export default Modal;
