import React, { useEffect, useState } from "react";
import facts from "./facts";

const Modal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [i, setI] = useState(0);

  // Automatically open the modal after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setI(Math.floor(Math.random() * facts.length));
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
              <p>{facts[i]}</p>
            </div>
            <div className="modal-footer">
              <button className="modal-button" disabled onClick={closeModal}>
              Learn More
              </button>
              <button className="modal-button" onClick={closeModal}>
              Start Investing
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
