import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchUser } from "../../../Redux/Modules/Auth/auth";
import firebase from "../../../Config/firebase";
import "./navbar.css";
import keys from "../../../Config/keys";
import axios from "axios";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      showDropdown: false,
      people: []
    };
  }

  logOut = () => {
    firebase
      .auth()
      .signOut()
      .then(function() {
        console.log("Logged Out Successfully");
      })
      .catch(function(error) {
        console.error(error);
      });
  };

  showDropdown = () => {
    this.setState({ showDropdown: true });
  };

  hideDropdown = () => {
    setTimeout(() => {
      this.setState({ showDropdown: false, people: [], search: "" });
    }, 100);
  };

  fetchPeople = e => {
    this.setState({ search: e.target.value });
    axios
      .post(`${keys.baseURL}/BRXIArWSf2sCHprS2bQ4/searchPeople`, {
        search: e.target.value
      })
      .then(res => {
        this.setState({ people: res.data });
      })
      .catch(err => {
        console.error(err);
      });
  };

  render() {
    let { currentUser } = this.props;
    let dropdownClass = this.state.showDropdown
      ? "dropdown list-group show-dropdown"
      : "dropdown list-group";
    return (
      <Fragment>
        <nav className="navbar navbar-expand navbar-light bg-light">
          <Link className="navbar-brand mb-0 h1 d-none d-md-block " to="/">
            OA
          </Link>
          <input
            type="text"
            className="form-control"
            style={{ width: "35%", height: 30 }}
            placeholder="Search"
            onChange={this.fetchPeople}
            onFocus={this.showDropdown}
            onBlur={this.hideDropdown}
            value={this.state.search}
          />
          <div className={dropdownClass}>
            {this.state.people.map((item, index) => {
              return (
                <li
                  className="list-group-item btn btn-light text-left"
                  key={index}
                >
                  <img
                    src={item.photoURL}
                    style={{ height: 30, borderRadius: "100%" }}
                    alt="profile"
                  />
                  <Link to={"/people/" + item.uid} className="ml-3">
                    {item.displayName}
                  </Link>
                </li>
              );
            })}
          </div>
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/profile">
                <img
                  src={currentUser.photoURL}
                  style={{
                    borderRadius: "100%",
                    height: 25,
                    marginRight: 10
                  }}
                  alt="Profile"
                />
                {currentUser.firstName}
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/community">
                Community
                <span className="sr-only">(current)</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/" className="nav-link" onClick={this.logOut}>
                <i class="fas fa-sign-out-alt" />{" "}
              </Link>
            </li>
          </ul>
        </nav>
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
)(Navbar);
