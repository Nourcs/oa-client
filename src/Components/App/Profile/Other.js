import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { fetchUser } from "../../../Redux/Modules/Auth/auth";
import { Redirect } from "react-router-dom";
import axios from "axios";
import keys from "../../../Config/keys";
import Post from "./Post";
import _ from "lodash";

class Other extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newPost: "",
      posts: [],
      comments: [],
      currentProfile: {},
      currentUser: false,
      following: false
    };
  }

  componentDidMount() {
    let id = this.props.match.params.id;
    if (id === this.props.currentUser.uid) {
      this.setState({ currentUser: true });
    }

    axios
      .post(`${keys.baseURL}/BRXIArWSf2sCHprS2bQ4/people/${id}`)
      .then(response => {
        axios
          .post(`${keys.baseURL}/BRXIArWSf2sCHprS2bQ4/posts`, {
            uid: response.data.uid
          })
          .then(res => {
            this.setState(
              { posts: res.data, currentProfile: response.data },
              () => {
                axios
                  .post(
                    `${keys.baseURL}/BRXIArWSf2sCHprS2bQ4/followers/${
                      this.state.currentProfile._id
                    }`,
                    {
                      currentUser: this.props.currentUser._id
                    }
                  )
                  .then(res => {
                    this.setState({
                      following: res.data.following
                    });
                  });
              }
            );
          })
          .catch(err => {
            console.error(err);
          });
      });
  }

  componentWillReceiveProps(props, nextProps) {
    let id = props.match.params.id;
    if (id === this.props.currentUser.uid) {
      this.setState({ currentUser: true }, () => {
        this.setState({ comments: [] });
        if (!_.isEmpty(props.post)) {
          let { post } = props;
          axios
            .post(`${keys.baseURL}/BRXIArWSf2sCHprS2bQ4/comments/${post._id}`)
            .then(comment => {
              if (comment.data.length > 0) {
                let comments = [...comment.data];
                this.setState({ comments });
              }
            });
        }
      });
    }

    axios
      .post(`${keys.baseURL}/BRXIArWSf2sCHprS2bQ4/people/${id}`)
      .then(response => {
        //this.setState({ currentProfile: res.data });
        axios
          .post(`${keys.baseURL}/BRXIArWSf2sCHprS2bQ4/posts`, {
            uid: response.data.uid
          })
          .then(res => {
            this.setState(
              { posts: res.data, currentProfile: response.data },
              () => {
                axios
                  .post(
                    `${keys.baseURL}/BRXIArWSf2sCHprS2bQ4/followers/${
                      this.state.currentProfile._id
                    }`,
                    {
                      currentUser: this.props.currentUser._id
                    }
                  )
                  .then(res => {
                    this.setState({
                      following: res.data.following
                    });
                  });
              }
            );
          })
          .catch(err => {
            console.error(err);
          });
      });
  }

  onPostChange = e => {
    let newPost = e.target.value;
    this.setState({
      newPost
    });
  };

  newPost = e => {
    e.preventDefault();
    axios
      .post(
        `${keys.baseURL}/BRXIArWSf2sCHprS2bQ4/${
          this.state.currentProfile.uid
        }/newPost`,
        {
          uid: this.props.currentUser.uid,
          newPost: this.state.newPost
        }
      )
      .then(res => {
        axios
          .post(
            `${keys.baseURL}/BRXIArWSf2sCHprS2bQ4/${
              this.state.currentProfile.uid
            }/posts`
          )
          .then(res => {
            this.setState({ posts: res.data, newPost: "" });
          });
      });
  };
  onFollow = () => {
    this.setState({ following: !this.state.following }, () => {
      if (!this.state.following) {
        axios
          .post(
            `${keys.baseURL}/BRXIArWSf2sCHprS2bQ4/unfollow/${
              this.state.currentProfile._id
            }`,
            { currentUser: this.props.currentUser._id }
          )
          .then(() => {
            this.props.fetchUser();
          });
      } else {
        axios
          .post(
            `${keys.baseURL}/BRXIArWSf2sCHprS2bQ4/follow/${
              this.state.currentProfile._id
            }`,
            { currentUser: this.props.currentUser._id }
          )
          .then(() => {
            this.props.fetchUser();
          });
      }
    });
  };

  render() {
    let { currentProfile } = this.state;
    if (!_.isEmpty(currentProfile)) {
      return (
        <Fragment>
          {this.state.currentUser ? <Redirect to="/profile" /> : ""}

          <div className="jumbotron jumbotron-fluid">
            <div className="container text-center">
              <img
                src={currentProfile.photoURL}
                style={{ borderRadius: "100%", width: 200 }}
                className="img-thumbnail mx-auto d-block mb-3"
                alt="Profile"
              />
              <h1>{currentProfile.displayName}</h1>
              {this.state.following ? (
                <button className="btn btn-light mb-0" onClick={this.onFollow}>
                  Unfollow
                </button>
              ) : (
                <button className="btn btn-light mb-0" onClick={this.onFollow}>
                  Follow
                </button>
              )}
            </div>
          </div>
          <div className="container">
            <div className="row">
              <div className="col-md-4">
                <h3>Intro</h3>
              </div>
              <div className="col-md-8">
                <div className="card mx-auto mb-3">
                  <div className="card-body">
                    <h5>Create a post</h5>
                    <form method="post">
                      <input
                        type="text"
                        placeholder={
                          "Write Something to " +
                          currentProfile.firstName +
                          "..."
                        }
                        name="question"
                        className="form-control"
                        onChange={this.onPostChange}
                        value={this.state.newPost}
                      />
                      <button
                        type="submit"
                        className="form-control btn btn-dark my-3"
                        onClick={this.newPost}
                      >
                        Share
                      </button>
                    </form>
                  </div>
                </div>
                {this.state.posts.length > 0
                  ? this.state.posts.map((item, index) => {
                      return <Post post={item} key={index} />;
                    })
                  : ""}
              </div>
            </div>
          </div>
        </Fragment>
      );
    } else {
      return "";
    }
  }
}

function mapStateToProps({ currentUser }) {
  return { currentUser };
}

export default connect(
  mapStateToProps,
  { fetchUser }
)(Other);
