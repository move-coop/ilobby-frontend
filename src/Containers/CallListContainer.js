import React from "react";
import { connect } from 'react-redux'
import { Header } from "semantic-ui-react";


class CallListContainer extends React.Component {
  
  render() {

    // We can use the `useParams` hook here to access
    // the dynamic pieces of the URL.
    // let { id } = useParams();

    return (
      <div>
        <h3>ID: {this.props.match.params.id}</h3>
      </div>
    )
  } 
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
    campaigns: state.campaigns,
    actions: state.actions,
    legislatorActions: state.legislatorActions,
    callLists: state.callLists,
    calls: state.calls,
    legislators: state.legislators
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setUser: (json) => {
      console.log("logged in called setUser")
      debugger
      dispatch({ type: "SET_USER", payload: json })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CallListContainer)
