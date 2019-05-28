import React, { Component, Fragment } from "react";
import nationalities from "./nationalities.json";
import { connect } from "react-redux";
import { fetchUser } from "../../../Redux/Modules/Auth/auth";
import axios from "axios";
import keys from "../../../Config/keys";

const publicIp = require("public-ip");
const iplocation = require("iplocation").default;

class Nationality extends Component {
  constructor(props) {
    super(props);
    this.state = { value: "American" };
  }

  componentDidMount() {
    (async () => {
      iplocation(await publicIp.v4(), [], (error, res) => {
        if (res) {
          this.setState({ country: res });
        }
      });
    })();
  }

  handleChange = e => {
    this.setState({ value: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    console.log(this.props.currentUser);
    axios
      .post(
        `${keys.baseURL}/BRXIArWSf2sCHprS2bQ4/updateUser/${
          this.props.currentUser._id
        }`,
        { nationality: this.state.value, currentCity: this.state.country.city }
      )
      .then(res => {
        this.props.fetchUser();
      });
  };
  render() {
    console.log(this.state, this.props);
    return (
      <Fragment>
        <div className="container-fluid">
          <h1 className="text-center" style={{ marginTop: 200 }}>
            Where are you from ?
          </h1>
          <form>
            <div className="form-group ">
              <select
                className="form-control mx-auto mt-5"
                defaultValue={this.state.countryCode}
                value={this.state.value}
                onChange={this.handleChange}
                style={{ width: 250 }}
              >
                {nationalities.map((item, index) => {
                  return (
                    <option
                      value={item.adj}
                      key={index}
                      className="form-control"
                    >
                      {item.country}
                    </option>
                  );
                })}
              </select>
              <button
                type="submit"
                className="form-control mx-auto mt-3"
                onClick={this.handleSubmit}
                style={{ width: 250 }}
              >
                Next
              </button>
            </div>
          </form>
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
)(Nationality);
