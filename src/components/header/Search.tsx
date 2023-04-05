import { useState } from "react";
import { InputGroup } from "../commons";

const Search = ({}) => {
  const [keyword, setKeyword] = useState("");
  return (
    <div className="w-80 max-w-full">
      <InputGroup placeholder="Keyword..." value={keyword} setValue={setKeyword} onBtnClick={() => {}}>
        Search
      </InputGroup>
    </div>
  );
};

export default Search;
