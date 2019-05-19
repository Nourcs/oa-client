import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import "./home.css";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Fragment>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="d-flex mx-auto">
            <div className="navbar-nav d-flex">
              <Link className="nav-item nav-link" to="/login">
                Log in
              </Link>
            </div>
            <div className="navbar-nav d-flex mx-5  mb-0">
              <Link to="/" className="nav-item nav-link active mb-0">
                <b> OA </b>
              </Link>
            </div>
            <div className="navbar-nav d-flex">
              <Link className="nav-item nav-link" to="/signup">
                Sign up
              </Link>
            </div>
          </div>
        </nav>

        <div className="jumbotron jumbotron-fluid" style={{ height: "auto" }}>
          <div className="container mt-5">
            <h2> Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h2>
            <h5 className="mt-5 align-items">
              <i className="far fa-newspaper" /> Duis aute irure dolor in
              reprehenderit in voluptate.
            </h5>
            <h5 className="mt-5">
              <i className="fas fa-retweet" /> Duis aute irure dolor in
              reprehenderit in voluptate.
            </h5>
            <h5 className="mt-5">
              <i className="fas fa-network-wired" /> Duis aute irure dolor in
              reprehenderit in voluptate.
            </h5>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Home;
