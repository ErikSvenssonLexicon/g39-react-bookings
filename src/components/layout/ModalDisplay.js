import React from "react";

const ModalDisplay = React.forwardRef((props, ref) => {
  return (
    <div className="modal" ref={ref} tabIndex="-1">
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{props.title ? props.title : ''}</h5>
            <button
              type="button"
              className="btn-close"
              onClick={() => props.modal.hide()}
            ></button>
          </div>
          <div className="modal-body">{props.children}</div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => props.modal.hide()}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});

export default ModalDisplay;
