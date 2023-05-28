import React, { useState } from "react";
import Animate from "./Animate";
import Button from "./Button";

const Accordion = ({ title, children }: { title: string; children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Button btnType="secondary-light" className="w-full" onClick={toggleAccordion}>
        {title}
      </Button>
      <div
        className={`${
          isOpen ? "scroll-hidden max-h-44 overflow-x-hidden overflow-y-scroll" : "max-h-0 overflow-hidden"
        } duration-300 ease-in-out`}
      >
        {children}
      </div>
    </>
  );
};

export default Accordion;
