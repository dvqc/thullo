import React from "react";
import { Button } from "../commons";

const Search = ({}) => {
  return (
    <div className="w-80 max-w-full">
      <div className="relative flex w-full items-center">
        <Button className="absolute top-0 right-0 z-10" type="submit">
          Search
        </Button>
        <input
          type="text"
          className="block h-8 w-full rounded-lg bg-white  py-1 px-3 text-sm text-gray-900 drop-shadow-lg focus:border-blue-500 focus:ring-blue-500 "
          placeholder="Keyword..."
          required
        />
      </div>
    </div>
  );
};

export default Search;
