import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { fetchUser } from "../Redux/Modules/Auth/auth";
import { Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";

// Import Components
import Home from "./Auth/Home";
import Signup from "./Auth/Signup";
import Login from "./Auth/Login";

import Feed from "./App/Feed/Feed";
import Profile from "./App/Profile/Profile";
import Other from "./App/Profile/Other";
import Settings from "./App/Profile/Settings";
import Community from "./App/Community/Community";

import NotFound from "./Other/NotFound/NotFound";
import Loading from "./Other/Loading/Loading";
import Navbar from "./App/Navbar/Navbar";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    console.log(this.props);

    return (
      <Fragment>
        {this.props.currentUser === null ? (
          <Loading />
        ) : this.props.currentUser === false ? (
          <Fragment>
            <Switch>
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={Signup} />
              <Route exact path="/" component={Home} />
              <Route component={NotFound} />
            </Switch>
          </Fragment>
        ) : (
          <Fragment>
            {" "}
            <Navbar />
            <Switch>
              <Route exact path="/" component={Feed} />
              <Route exact path="/people/:id" component={Other} />
              <Route exact path="/profile" component={Profile} />
              <Route exact path="/settings" component={Settings} />
              <Route exact path="/community" component={Community} />
              <Route component={NotFound} />
            </Switch>
          </Fragment>
        )}
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
)(App);
