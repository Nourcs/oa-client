import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import "./home.css";
import Loading from "../Other/Loading/Loading";

import _ from "lodash";
import Typed from "react-typed";

const publicIp = require("public-ip");
const iplocation = require("iplocation").default;

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      country: {}
    };
  }
  componentDidMount() {
    (async () => {
      iplocation(await publicIp.v4(), [], (error, res) => {
        if (res) {
          console.log(res);
          this.setState({ country: res });
        }
      });
    })();
  }

  render() {
    return (
      <Fragment>
        {!_.isEmpty(this.state.country) ? (
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

            <div className="jumbotron jumbotron-fluid">
              <div className="container mt-5 text-center">
                <h2>
                  Are you{" "}
                  <Typed
                    strings={["a tourist in", "visiting", "new in"]}
                    typeSpeed={120}
                    backSpeed={75}
                    backDelay={1000}
                    // style={{ color: "red" }}
                    className="text-danger"
                    loop
                  />
                  {this.state.country.city} ?
                </h2>

                <h5 className="mt-5 align-items">
                  <i className="fas fa-network-wired" />
                  <label className="ml-2 mb-0">
                    Find people with the same nationality as you in{" "}
                    {this.state.country.city}
                  </label>
                </h5>
                <h5 className="mt-5">
                  <i className="fas fa-retweet" />
                  <label className="ml-2 mb-0">
                    Share what's on your mind with everyone.
                  </label>
                </h5>
                <h5 className="mt-5">
                  <i className="far fa-newspaper" />
                  <label className="ml-2 mb-0">
                    Follow whoever you want and see what they're sharing in your
                    news feed.
                  </label>
                </h5>
              </div>
            </div>
          </Fragment>
        ) : (
          <Loading />
        )}
      </Fragment>
    );
  }
}

export default Home;
