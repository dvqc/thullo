import React, { HTMLProps } from "react";

const Skeleton: React.FC<HTMLProps<HTMLDivElement>> = ({ className, ...rest }) => {
  return <div {...rest} className={`skeleton ${className ?? ""}`}></div>;
};
export default Skeleton;
