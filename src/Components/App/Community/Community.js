import React, { Component, Fragment } from "react";
import Navbar from "../Navbar/Navbar";

class Community extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Fragment>
        <Navbar />
        <h1>Community</h1>
      </Fragment>
    );
  }
}

export default Community;
