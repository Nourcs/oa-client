import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { fetchUser } from "../../../Redux/Modules/Auth/auth";
import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import axios from "axios";
import keys from "../../../Config/keys";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newPost: "",
      posts: ""
    };
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
              uid: this.props.currentUser.uid
            })
            .then(res => {
              console.log(res.data);
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

  componentDidMount() {
    axios
      .post(`${keys.baseURL}/BRXIArWSf2sCHprS2bQ4/posts`, {
        uid: this.props.currentUser.uid
      })
      .then(res => {
        console.log("POOOSTS", res.data);
        this.setState({ posts: res.data });
      })
      .catch(err => {
        console.error(err);
      });
  }

  render() {
    let { currentUser } = this.props;
    return (
      <Fragment>
        <Navbar />
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
                  <form>
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
              {this.state.posts.length > 0
                ? this.state.posts.map((item, index) => {
                    return (
                      <div className="card mx-auto mb-3" key={index}>
                        <div className="card-header d-flex">
                          <img
                            src={item.from.photoURL}
                            style={{ height: 25, borderRadius: "100%" }}
                          />
                          <Link to={"/" + item.from.uid} className="ml-2">
                            {item.from.displayName}
                          </Link>
                        </div>
                        <div className="card-body">
                          <h5>{item.post}</h5>
                          <label className="float-left text-muted">
                            <i className="fas fa-heart" />
                            <span className="badge badge-secondary bg-light text-secondary">
                              2
                            </span>
                          </label>
                        </div>

                        <div className="card-footer d-flex justify-content-center align-items-center">
                          <img
                            src={this.props.currentUser.photoURL}
                            style={{ height: 25, borderRadius: "100%" }}
                          />
                          <input
                            type="text"
                            placeholder="Write a comment..."
                            name="question"
                            className="form-control ml-3"
                            style={{ borderRadius: "100px" }}
                          />
                        </div>
                      </div>
                    );
                  })
                : ""}
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
