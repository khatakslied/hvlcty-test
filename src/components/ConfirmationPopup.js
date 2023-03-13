import React from "react";

const ConfirmationPopup = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="popup-mask">
      <div className="popup">
        <p>{message}</p>
        <div className="popup-buttons">
          <button onClick={onCancel} className="cancel">No</button>
          <button onClick={onConfirm} className="confirm">Yes</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPopup;
