import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { fetchUser } from "../../../Redux/Modules/Auth/auth";
import { Link } from "react-router-dom";
import axios from "axios";
import keys from "../../../Config/keys";
import "./style.css";
import Post from "./Post";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newPost: "",
      posts: []
    };
  }

  componentDidMount() {
    axios
      .post(`${keys.baseURL}/BRXIArWSf2sCHprS2bQ4/posts`, {
        postLength: this.state.posts.length,
        uid: this.props.currentUser.uid
      })
      .then(res => {
        this.setState({ posts: res.data });
      })
      .catch(err => {
        console.error(err);
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
    if (this.state.newPost.length > 0) {
      axios
        .post(`${keys.baseURL}/BRXIArWSf2sCHprS2bQ4/newPost`, {
          uid: this.props.currentUser.uid,
          newPost: this.state.newPost
        })
        .then(res => {
          axios
            .post(`${keys.baseURL}/BRXIArWSf2sCHprS2bQ4/posts`, {
              postLength: 0,
              uid: this.props.currentUser.uid
            })
            .then(res => {
              this.setState({ posts: res.data, newPost: "" });
            })
            .catch(err => {
              console.error(err);
            });
        })
        .catch(err => {
          console.error(err);
        });
    }
  };

  showMore = () => {
    axios
      .post(`${keys.baseURL}/BRXIArWSf2sCHprS2bQ4/posts`, {
        postLength: this.state.posts.length,
        uid: this.props.currentUser.uid
      })
      .then(res => {
        this.setState({ posts: res.data });
      })
      .catch(err => {
        console.error(err);
      });
  };

  render() {
    let { currentUser } = this.props;
    return (
      <Fragment>
        <div className="jumbotron jumbotron-fluid">
          <div className="container text-center">
            <img
              src={currentUser.photoURL}
              style={{ borderRadius: "100%", width: 200 }}
              className="img-thumbnail mx-auto d-block mb-3"
              alt="Profile"
            />
            <h1>{currentUser.displayName}</h1>
            <Link to="/settings" className="lead mb-0">
              <i className="fas fa-ellipsis-h" style={{ fontSize: 30 }} />
            </Link>
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
                      placeholder="What's on your mind?"
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
              <Post />
              {this.state.posts.length > 0
                ? this.state.posts.map((item, index) => {
                    return <Post post={item} key={index} />;
                  })
                : ""}
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
)(Profile);
