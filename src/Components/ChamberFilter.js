import React, { useState } from "react";
import { Dropdown } from "semantic-ui-react";

const chamberOptions = [
  {
    key: 'Senate',
    text: 'Senate',
    value: 'Senate',
  },
  {
    key: 'Assembly',
    text: 'Assembly',
    value: 'Assembly',

  }
]

const ChamberFilter = props => {
  const [getSearch, setSearch] = useState("");

  const searchChangeHandler = newSearch => setSearch(newSearch);

  return (
    <Dropdown
      placeholder="Select Chamber"
      fluid
      selection
      options={chamberOptions}
      onChange={e => searchChangeHandler(e.target.value)}
    />
  );
};

export default ChamberFilter;
