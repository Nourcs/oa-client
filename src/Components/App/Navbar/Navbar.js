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
      people: [],
      menu: false
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

  showMenu = () => {
    this.setState({ menu: !this.state.menu });
  };

  render() {
    console.log(this.state.menu);
    let { currentUser } = this.props;
    let dropdownClass = this.state.showDropdown
      ? "dropdown list-group show-dropdown"
      : "dropdown list-group";
    let menuClass = this.state.menu ? "menu" : "menu hide-menu";
    return (
      <Fragment>
        <nav className="navbar navbar-expand navbar-light bg-light">
          <Link className="navbar-brand mb-0 h1" to="/">
            OA
          </Link>
          <input
            type="text"
            className="form-control "
            style={{ width: "50%", height: 30 }}
            placeholder="Search"
            onChange={this.fetchPeople}
            onFocus={this.showDropdown}
            onBlur={this.hideDropdown}
            value={this.state.search}
          />
          <div className={dropdownClass} style={{ zIndex: 999 }}>
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
          <ul className="navbar-nav ml-auto d-none d-sm-flex d-xs-flex">
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
                Logout
              </Link>
            </li>
          </ul>

          <ul className="navbar-nav ml-auto d-block d-sm-none">
            <li className="nav-link">
              <i
                className={!this.state.menu ? "fas fa-bars" : "fas fa-times"}
                onClick={this.showMenu}
              />
            </li>
          </ul>

          <div className={menuClass}>
            <ul className="list-group list-group-flush">
              <li className="list-group-item w-100 text-center bg-light">
                <Link
                  className="nav-link"
                  to="/profile"
                  onClick={this.showMenu}
                >
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
              <li className="list-group-item w-100 text-center bg-light">
                <Link
                  className="nav-link"
                  to="/community"
                  onClick={this.showMenu}
                >
                  Community
                  <span className="sr-only">(current)</span>
                </Link>
              </li>
              <li className="list-group-item w-100 text-center bg-light">
                <Link
                  to="/"
                  className="nav-link"
                  onClick={() => {
                    this.logOut();
                    this.showMenu();
                  }}
                >
                  Log out
                </Link>
              </li>
            </ul>
          </div>
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
