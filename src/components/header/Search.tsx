import React from "react";
import { Button } from "../commons";

const Search = ({}) => {
  return (
    <div className="w-80 max-w-full">
      <div className="relative flex w-full items-center">
        <Button className="absolute top-0 right-0 z-50" type="submit">
          Search
        </Button>
        <input type="text" className="input h-8 border-transparent" placeholder="Keyword..." required />
      </div>
    </div>
  );
};

export default Search;
