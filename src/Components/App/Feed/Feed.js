import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { fetchUser } from "../../../Redux/Modules/Auth/auth";
import Post from "../Profile/Post";
import axios from "axios";
import keys from "../../../Config/keys";

const publicIp = require("public-ip");
const iplocation = require("iplocation").default;

class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      following: [],
      posts: [],
      country: ""
    };
  }

  componentDidMount() {
    let { following } = this.props.currentUser;
    axios
      .post(`${keys.baseURL}/BRXIArWSf2sCHprS2bQ4/feedPosts`, { following })
      .then(res => {
        let posts = [...this.state.posts, ...res.data];
        this.setState({ posts });
        (async () => {
          iplocation(await publicIp.v4(), [], (error, res) => {
            if (res) {
              this.setState({ country: res });
              axios
                .post(
                  `${keys.baseURL}/BRXIArWSf2sCHprS2bQ4/updateUser/${
                    this.props.currentUser._id
                  }`,
                  {
                    nationality: this.props.currentUser.nationality,
                    currentCity: res.city
                  }
                )
                .then(res => {
                  this.props.fetchUser();
                });
            }
          });
        })();
      });
  }

  render() {
    return (
      <Fragment>
        <div className="container mt-5">
          <div className="row">
            <div className="col-8 offset-2">
              {this.state.posts.length > 0 ? (
                this.state.posts.map((item, index) => {
                  if (item.from.uid !== this.props.currentUser.uid) {
                    return <Post post={item} key={index} />;
                  } else return "";
                })
              ) : (
                <div>It might be a good idea if you follow some people :)</div>
              )}
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
)(Feed);
