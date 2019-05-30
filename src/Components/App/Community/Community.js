import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { fetchUser } from "../../../Redux/Modules/Auth/auth";
import { Link } from "react-router-dom";
import axios from "axios";
import keys from "../../../Config/keys";
class Community extends Component {
  constructor(props) {
    super(props);
    this.state = {
      community: []
    };
  }

  componentDidMount() {
    let { nationality, currentCity } = this.props.currentUser;
    axios
      .post(`${keys.baseURL}/BRXIArWSf2sCHprS2bQ4/community`, {
        nationality,
        currentCity
      })
      .then(res => {
        this.setState({ community: res.data });
      });
  }

  render() {
    return (
      <Fragment>
        <div className="container-fluid mt-5">
          <div className=" mb-3">
            <h1>
              {this.props.currentUser.nationality}s in{" "}
              {this.props.currentUser.currentCity}
            </h1>
          </div>

          <div className="card">
            <ul className="list-group list-group-flush">
              {this.state.community.map((users, index) => {
                if (this.props.currentUser._id !== users._id) {
                  return (
                    <li className="list-group-item" key={index}>
                      <img
                        src={users.photoURL}
                        style={{ height: 30, borderRadius: "100%" }}
                        alt="profile"
                      />
                      <Link to={"/people/" + users.uid} className="ml-3">
                        {users.displayName}
                      </Link>
                    </li>
                  );
                }
                return "";
              })}
            </ul>
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
)(Community);
