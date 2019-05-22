import React, { Component, Fragment } from "react";
import Navbar from "../Navbar/Navbar";
import { connect } from "react-redux";
import { fetchUser } from "../../../Redux/Modules/Auth/auth";
import { Redirect } from "react-router-dom";

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submitted: false
    };
  }

  onSubmit = () => {
    this.setState({
      submitted: true
    });
  };
  render() {
    let { currentUser } = this.props;
    console.log("Current User in Settings", currentUser);
    return (
      <Fragment>
        {this.state.submitted ? <Redirect to="/profile" /> : ""}
        <Navbar />
        <h1 className="mt-5 text-center">Settings</h1>
        <div className="row mb-5 ml-1">
          <div
            className="card mx-auto col-sm-7 col-md-6 col-lg-4 bg-light  mt-4"
            style={{ width: "75%" }}
          >
            <div className="card-body">
              <form className="mx-2 mt-4">
                <label>Full Name</label>
                <div className="form-group d-flex">
                  <input
                    type="text"
                    name="displayName"
                    placeholder="First Name"
                    className="form-control"
                    defaultValue={currentUser.displayName}
                  />
                </div>{" "}
                <label>Email</label>
                <div className="form-group">
                  <input
                    type="email"
                    name="email"
                    placeholder="E-mail"
                    className="form-control"
                    defaultValue={currentUser.email}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label>Birthday</label>
                  <br />
                  <input
                    className="form-control"
                    type="date"
                    name="birthdate"
                    defaultValue={currentUser.birthdate}
                  />
                </div>
                <label>Gender</label>
                <div className="form-group d-flex ">
                  <div className="form-check mr-4 ">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="gender"
                      value="male"
                      defaultChecked
                    />
                    <label className="form-check-label" htmlFor="male">
                      Male
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="gender"
                      value="female"
                    />
                    <label className="form-check-label" htmlFor="female">
                      Female
                    </label>
                  </div>
                </div>
              </form>
              <button
                id="email-signup"
                className="btn btn-dark my-3"
                style={{ width: "100%" }}
                onClick={this.onSubmit}
              >
                Submit
              </button>
            </div>
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
)(Settings);
