import React, { useState } from "react";
import SearchInput from "../Components/SearchInput";
import PartyFilter from "../Components/PartyFilter";
import ChamberFilter from "../Components/ChamberFilter";
import CommitteeFilter from "../Components/CommitteeFilter";
import { Grid, GridColumn } from "semantic-ui-react";


class SPCFiltersContainer extends React.Component {

  render() {
    return (
      <Grid>
        <Grid.Column width={4}>
          <SearchInput />
        </Grid.Column>
        <Grid.Column width={4}>
          <ChamberFilter />
        </Grid.Column>
        <Grid.Column width={4}>
          <PartyFilter />
        </Grid.Column>
        <Grid.Column width={4}>
          <CommitteeFilter />
        </Grid.Column>
      </Grid>
    );
  }
}

export default SPCFiltersContainer;
