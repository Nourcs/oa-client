import React, { Component } from "react";

class Loading extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="text-center mt-5">
        <img
          src="https://loading.io/spinners/rolling/lg.curve-bars-loading-indicator.gif"
          style={{ height: 100, marginTop: 200, filter: "grayscale(100%)" }}
          alt="loading.."
        />
      </div>
    );
  }
}

export default Loading;
