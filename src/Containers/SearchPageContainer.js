import React from "react";
import SPCSearchResultsContainer from "./SPCSearchResultsContainer";
import SPCFiltersContainer from "./SPCFiltersContainer";
import SPCMapsContainer from "./SPCMapsContainer";
import { Header } from "semantic-ui-react";



class SearchPageContainer extends React.Component {
  render() {
    return (
      <div>
        <Header>SEARCH PAGE</Header>
        <SPCFiltersContainer />
        <SPCMapsContainer />
        <SPCSearchResultsContainer />
      </div>
    );
  }
}

export default SearchPageContainer;
