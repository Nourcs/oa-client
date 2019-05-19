import React, { Component } from "react";

class NotFound extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="text-center mt-5">
        <h1 className="pt-5">404 Not Found</h1>
      </div>
    );
  }
}

export default NotFound;
