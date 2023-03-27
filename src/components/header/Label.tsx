import React from "react";
import { Button } from "../commons";

import { AppsSvg } from "../svg";
const Label = ({}) => {
  return (
    <div className="flex items-center">
      <div className="font-semibold">
        <div>Devchallenges Board</div>
      </div>
      <div className="mx-4 h-8 w-[1px] bg-gray-300"></div>
      <Button btnType="secondary" className="w-28">
        <AppsSvg className="w-4 h-4"/>
        All board
      </Button>
    </div>
  );
};

export default Label;
