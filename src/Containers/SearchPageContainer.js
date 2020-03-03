import React from "react";
import SPCSearchResultsContainer from "./SPCSearchResultsContainer";
import SPCFiltersContainer from "./SPCFiltersContainer";
import SPCMapsContainer from "./SPCMapsContainer";
import { Grid } from "semantic-ui-react";



class SearchPageContainer extends React.Component {
  render() {
    return (
        <Grid columns='equal'>
          <Grid.Row>
            <Grid.Column>
                <SPCFiltersContainer />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row stretched>
            <Grid.Column>
                <SPCSearchResultsContainer />
            </Grid.Column>
            <Grid.Column>
                <SPCMapsContainer />
            </Grid.Column>
          </Grid.Row>
          {/* <Grid.Row>
          <a className="twitter-timeline" data-theme="dark" href={`https://twitter.com/Biaggi4NY?ref_src=twsrc%5Etfw`}>Loading</a>
          
          </Grid.Row> */}
        </Grid>
    );
  }
}

export default SearchPageContainer;
