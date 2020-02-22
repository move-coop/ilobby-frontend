import React, { useState } from "react";
import { Input } from 'semantic-ui-react'

const SearchInput = props => {

  const [getSearch, setSearch] = useState("");

  const searchChangeHandler = newSearch => setSearch(newSearch);

  return (
    <Input 
      fluid
      onChange={e => searchChangeHandler(e.target.value)}
      value={getSearch}
      type="text"
      placeholder="Filter by name or district..."
    />
  );
};

export default SearchInput;
