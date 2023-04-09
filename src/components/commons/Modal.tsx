import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { CloseSvg } from "../svg";
import Button from "./Button";

const Modal = ({
  isOpen,
  onClose,
  className,
  children
}: {
  isOpen: boolean;
  className?: string;
  onClose: () => void;
  children: React.ReactNode;
}) => {
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    setIsClosing(false);
  }, [isOpen]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(onClose, 300);
  };

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div
      className={`scroll-hidden pointer-events-none fixed inset-0 z-50 overflow-y-scroll bg-black bg-opacity-50 
      ${isClosing ? "animate-fade-out " : "pointer-events-auto animate-fade-in "}`}
    >
      <div
        className={`relative left-1/2 my-24 w-fit -translate-x-1/2  rounded-lg bg-white px-6 py-5 shadow-lg
        transition-transform duration-100 ease-in-out ${className}
        ${isClosing ? "translate-y-4" : "-translate-y-4"}`}
      >
        {children}
        <Button onClick={handleClose} className="absolute top-3 right-3 h-8 w-8">
          <CloseSvg className="h-5 w-5 fill-white"></CloseSvg>
        </Button>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
