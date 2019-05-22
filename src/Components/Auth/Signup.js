import React, { Component, Fragment } from "react";
import { Link, Redirect } from "react-router-dom";
import firebase, {
  googleProvider,
  facebookProvider
} from "../../Config/firebase";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      birthdate: "1997-01-16",
      gender: "male",
      signedUp: false
    };
  }

  onInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  signup = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(res => {
        firebase
          .auth()
          .currentUser.updateProfile({
            displayName: this.state.firstname + " " + this.state.lastname
          })
          .then(response => {
            window.location.href = "/";
            this.setState({ signedUp: true });
          });
      })
      .catch(function(error) {
        console.error(error);
      });
  };

  facebookLogin = () => {
    firebase
      .auth()
      .signInWithPopup(facebookProvider)
      .catch(function(error) {
        console.error(error);
      })
      .then(res => {
        this.setState({ signedUp: true });
      });
  };

  googleLogin = () => {
    firebase
      .auth()
      .signInWithPopup(googleProvider)
      .catch(function(error) {
        console.error(error);
      })
      .then(res => {
        this.setState({ signedUp: true });
      });
  };

  render() {
    return (
      <Fragment>
        {this.state.signedUp ? <Redirect to="/" /> : ""}

        <nav className="navbar navbar-expand-lg navbar-light bg-light ">
          <div className="d-flex mx-auto">
            <div className="navbar-nav d-flex">
              <Link className="nav-item nav-link" to="/login">
                Log in
              </Link>
            </div>
            <div className="navbar-nav d-flex mx-5">
              <Link to="/" className="nav-item nav-link mb-0">
                OA
              </Link>
            </div>
            <div className="navbar-nav d-flex">
              <Link className="nav-item nav-link active" to="/signup">
                <b>Sign up</b>
              </Link>
            </div>
          </div>
        </nav>

        <div className="row mb-5 my-4 ml-1">
          <div
            className="card mx-auto mt-5 col-sm-7 col-md-6 col-lg-4 my-5 bg-light"
            style={{ width: "75%" }}
          >
            <div className="card-body">
              <hr className="hr-text" data-content="Sign Up With" />
              <div className="form-group">
                <button
                  type="submit"
                  id="facebook-signin"
                  className="btn btn-dark mb-3"
                  style={{ width: "100%" }}
                  onClick={this.facebookLogin}
                >
                  Facebook
                </button>
                <button
                  type="submit"
                  id="google-signin"
                  className="btn btn-dark"
                  style={{ width: "100%" }}
                  onClick={this.googleLogin}
                >
                  Google
                </button>
              </div>
              <hr className="hr-text" data-content="Or" />
              <form className="mx-2 mt-4">
                <div className="form-group d-flex">
                  <input
                    type="text"
                    name="firstname"
                    placeholder="First Name"
                    className="form-control mr-2"
                    onChange={this.onInput}
                  />
                  <input
                    type="text"
                    name="lastname"
                    placeholder="Last Name"
                    className="form-control ml-2"
                    onChange={this.onInput}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    name="email"
                    placeholder="E-mail"
                    className="form-control"
                    onChange={this.onInput}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="form-control"
                    onChange={this.onInput}
                  />
                </div>
                <div className="form-group">
                  <label>Birthday</label>
                  <br />
                  <input
                    className="form-control"
                    type="date"
                    name="birthdate"
                    defaultValue={this.state.birthdate}
                    onChange={this.onInput}
                  />
                </div>
                <div className="form-group d-flex ">
                  <div className="form-check mr-4 ">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="gender"
                      value="male"
                      onChange={this.onInput}
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
                      onChange={this.onInput}
                    />
                    <label className="form-check-label" htmlFor="female">
                      Female
                    </label>
                  </div>
                </div>
                <label className=" small ml-1">
                  By signing up you agree to our <Link to="#">Terms</Link> and
                  <Link to="#"> Privacy policy</Link>
                </label>
              </form>
              <button
                id="email-signup"
                className="btn btn-dark my-3"
                style={{ width: "100%" }}
                onClick={this.signup}
              >
                Sign up
              </button>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Signup;
