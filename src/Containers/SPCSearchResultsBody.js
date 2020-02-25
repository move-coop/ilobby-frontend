import React from "react";
import ListViewContainer from "./ListViewContainer";
import CardViewContainer from "./CardViewContainer";
import { connect } from 'react-redux'


class SPCSearchResultsBody extends React.Component {
  render() {
    return <div>
      {this.props.cardView ? <CardViewContainer /> : <ListViewContainer />}
      </div>;
  }
}

const mapStateToProps = (state) => {
  return {
    cardView: state.cardView
  }
}

export default connect(mapStateToProps)(SPCSearchResultsBody);


