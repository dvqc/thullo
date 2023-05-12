import React from "react";
import { Button } from "../commons";

import { AppsSvg } from "../svg";
const Label = ({ boardTitle }: { boardTitle: string }) => {
  return (
    <div className="flex items-center">
      <div className="font-semibold">
        <div>{boardTitle}</div>
      </div>
      <div className="mx-4 h-8 w-[1px] bg-gray-300"></div>
      <Button btnType="secondary" className="w-28">
        <AppsSvg className="h-4 w-4" />
        All board
      </Button>
    </div>
  );
};

export default Label;
