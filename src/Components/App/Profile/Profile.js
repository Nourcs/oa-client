import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { fetchUser } from "../../../Redux/Modules/Auth/auth";

import Navbar from "../Navbar/Navbar";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    let { currentUser } = this.props;
    return (
      <Fragment>
        <Navbar />
        <div className="jumbotron jumbotron-fluid">
          <div className="container text-center">
            <img
              src={currentUser.photoURL}
              style={{ borderRadius: "100%", width: 200 }}
              className="img-thumbnail mx-auto d-block mb-3"
              alt="Profile"
            />
            <h1>{currentUser.displayName}</h1>
            <p className="lead mb-0">
              <i className="fas fa-ellipsis-h" style={{ fontSize: 30 }} />
            </p>
          </div>
        </div>
      </Fragment>
    );
  }
}

function mapStateToProps({ currentUser }) {
  return { currentUser };
}

export default connect(
  mapStateToProps,
  { fetchUser }
)(Profile);
