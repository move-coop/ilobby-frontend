import React from "react";
import SPCSearchResultsContainer from "./SPCSearchResultsContainer";
import SPCFiltersContainer from "./SPCFiltersContainer";
import SPCMapsContainer from "./SPCMapsContainer";
import { Grid, Header } from "semantic-ui-react";



class SearchPageContainer extends React.Component {
  render() {
    return (
        <Grid columns='equal'>
          <Grid.Row>
            <Grid.Column>
              <SPCFiltersContainer />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <SPCSearchResultsContainer />
            </Grid.Column>
            <Grid.Column>
              <SPCMapsContainer />
            </Grid.Column>
          </Grid.Row>
        </Grid>
    );
  }
}

export default SearchPageContainer;
