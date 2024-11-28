import React, { useEffect, useState } from "react";

const Modal = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Automatically open the modal after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 3000);

    return () => clearTimeout(timer); // Cleanup the timer
  }, []);

  const closeModal = () => setIsOpen(false);

  return (
    <>
      {isOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h1 className="modal-title">Did you know</h1>
              <button className="close-button" onClick={closeModal}>
                ×
              </button>
            </div>
            <div className="modal-body">
              <p>Women tend to invest less than men?</p>
            </div>
            <div className="modal-footer">
              <button className="modal-button" onClick={closeModal}>
              See more here
              </button>
              <button className="modal-button" onClick={closeModal}>
              Start investing here
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
