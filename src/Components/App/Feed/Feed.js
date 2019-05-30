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
      .post(`${keys.baseURL}/BRXIArWSf2sCHprS2bQ4/feedPosts`, {
        following,
        postLength: 0
      })
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
  showMore = () => {
    let { following } = this.props.currentUser;

    axios
      .post(`${keys.baseURL}/BRXIArWSf2sCHprS2bQ4/feedPosts`, {
        postLength: this.state.posts.length,
        following
      })
      .then(res => {
        this.setState({ posts: res.data });
      })
      .catch(err => {
        console.error(err);
      });
  };

  render() {
    return (
      <Fragment>
        <div className="container mt-5">
          <div className="row">
            <div className="col-md-6 offset-md-3">
              {this.state.posts.length > 0 ? (
                this.state.posts.map((item, index) => {
                  return <Post post={item} key={index} />;
                })
              ) : (
                <div className="col-10 offset-1 display-4 text-center">
                  Follow some people
                </div>
              )}
              {this.state.posts.length > 0 ? (
                <button
                  className="mb-5 btn btn-dark w-100"
                  onClick={this.showMore}
                >
                  Show more
                </button>
              ) : (
                ""
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
