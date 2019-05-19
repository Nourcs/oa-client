import React, { Component, Fragment } from "react";
import { Link, Redirect } from "react-router-dom";
import firebase, {
  googleProvider,
  facebookProvider
} from "../../Config/firebase";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      remember: false,
      loggedIn: false
    };
  }

  onInput = e => {
    let value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    this.setState({
      [e.target.name]: value
    });
  };

  login = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(res => {
        this.setState({ loggedIn: true });
      })
      .catch(function(error) {
        console.error(error);
      });
  };

  facebookLogin = () => {
    firebase
      .auth()
      .signInWithPopup(facebookProvider)
      .then(res => {
        this.setState({ loggedIn: true });
      })
      .catch(function(error) {
        console.error(error);
      });
  };

  googleLogin = () => {
    firebase
      .auth()
      .signInWithPopup(googleProvider)
      .then(res => {
        this.setState({ loggedIn: true });
      })
      .catch(function(error) {
        console.error(error);
      });
  };

  render() {
    return (
      <Fragment>
        {this.state.loggedIn ? <Redirect to="/" /> : ""}
        <nav className="navbar navbar-expand-lg navbar-light bg-light ">
          <div className="d-flex mx-auto">
            <div className="navbar-nav d-flex">
              <Link className="nav-item nav-link active" to="/login">
                <b>Log in</b>
              </Link>
            </div>
            <div className="navbar-nav d-flex mx-5">
              <Link to="/" className="nav-item nav-link mb-0">
                OA
              </Link>
            </div>
            <div className="navbar-nav d-flex">
              <Link className="nav-item nav-link" to="/signup">
                Sign up
              </Link>
            </div>
          </div>
        </nav>
        <div className="row mt-4">
          <div
            className="card mx-auto mt-5 col-sm-7 col-md-6 col-lg-4 bg-light"
            style={{ width: "75%" }}
          >
            <div className="card-body">
              <form className="mx-2 mt-4">
                <div className="form-group">
                  <input
                    type="email"
                    name="email"
                    placeholder="E-mail"
                    id="email"
                    className="form-control"
                    onChange={this.onInput}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    id="password"
                    className="form-control"
                    onChange={this.onInput}
                  />
                </div>
                <div className="form-check align-items-center ">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="remember"
                    onChange={this.onInput}
                  />
                  <label
                    className="form-check-label small"
                    htmlFor="exampleCheck1"
                  >
                    Remember Me
                  </label>
                  <Link to="#" className="float-right small">
                    Forgot Password?
                  </Link>
                </div>
              </form>
              <button
                id="email-signin"
                className="btn btn-dark my-3"
                style={{ width: "100%" }}
                onClick={this.login}
              >
                Log in
              </button>
              <hr className="hr-text" data-content="Login With" />
              <div className="form-group">
                <button
                  type="submit"
                  id="facebook-signin"
                  className="btn btn-dark my-3"
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
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Login;
