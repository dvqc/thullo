import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { CloseSvg } from "../svg";
import Animate from "./Animate";
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
    if (!isOpen) {
      handleClose();
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsClosing(true);
    onClose();
  };

  // if (!isOpen) return null;

  return ReactDOM.createPortal(
    <Animate
      isMounted={isOpen}
      delay={200}
      animationIn="animate-fade-in"
      animationOut="animate-fade-out"
      className={` scroll-hidden pointer-events-none fixed inset-0 z-50 flex justify-center overflow-y-scroll bg-black bg-opacity-50 py-40
      ${isClosing ? "" : "pointer-events-auto"}`}
    >
      <div
        className={`relative top-1/3 h-fit  max-w-fit rounded-lg bg-white px-6 py-5 shadow-lg
        ${className} 
        ${isClosing ? "animate-bounce-down" : "animate-bounce-up"}`}
      >
        {children}
        <Button onClick={handleClose} className="absolute top-3 right-3 h-8 w-8">
          <CloseSvg className="h-5 w-5 fill-white"></CloseSvg>
        </Button>
      </div>
    </Animate>,
    document.body
  );
};

export default Modal;
