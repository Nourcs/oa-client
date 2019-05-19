import React, { Component, Fragment } from "react";
import Navbar from "../Navbar/Navbar";

class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Fragment>
        <Navbar />
        <h1>Feed</h1>
      </Fragment>
    );
  }
}

export default Feed;
