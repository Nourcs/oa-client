import React, { Component } from "react";

import { Link } from "react-router-dom";
import _ from "lodash";
import axios from "axios";
import keys from "../../../Config/keys";
import { connect } from "react-redux";
import { fetchUser } from "../../../Redux/Modules/Auth/auth";
import moment from "moment";

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
      newComment: "",
      total: 0,
      liked: false
    };
  }

  componentDidMount() {
    let { post } = this.props;
    if (!_.isEmpty(post)) {
      this.updateLikes(post);
      axios
        .post(`${keys.baseURL}/BRXIArWSf2sCHprS2bQ4/comments/${post._id}`)
        .then(comment => {
          if (comment.data.length > 0) {
            let comments = [...comment.data];
            this.setState({ comments });
          }
        });
    }
  }

  componentWillReceiveProps(props) {
    this.setState({ comments: [] });
    let { post } = props;
    if (!_.isEmpty(post)) {
      this.updateLikes(post);
      axios
        .post(`${keys.baseURL}/BRXIArWSf2sCHprS2bQ4/comments/${post._id}`)
        .then(comment => {
          if (comment.data.length > 0) {
            let comments = [...comment.data];
            this.setState({ comments });
          }
        });
    }
  }

  updateLikes = post => {
    axios
      .post(`${keys.baseURL}/BRXIArWSf2sCHprS2bQ4/likes/${post._id}`)
      .then(total => {
        this.setState({ total: total.data.total });
        axios
          .post(
            `${keys.baseURL}/BRXIArWSf2sCHprS2bQ4/currentUserLiked/${
              this.props.currentUser.uid
            }/${post._id}`
          )
          .then(liked => {
            this.setState({ liked: liked.data.liked });
          });
      });
  };

  onLike = e => {
    this.setState({ liked: !this.state.liked }, () => {
      let { post } = this.props;

      if (this.state.liked) {
        axios
          .post(`${keys.baseURL}/BRXIArWSf2sCHprS2bQ4/incLike/${post._id}`, {
            from: this.props.currentUser._id
          })
          .then(res => {
            this.updateLikes(post);
          });
      } else {
        axios
          .post(`${keys.baseURL}/BRXIArWSf2sCHprS2bQ4/decLike/${post._id}`, {
            from: this.props.currentUser._id
          })
          .then(res => {
            this.updateLikes(post);
          });
      }
    });
  };

  onCommentChange = e => {
    this.setState({ newComment: e.target.value });
  };

  newComment = e => {
    e.preventDefault();
    let id = e.target.id;

    if (this.state.newComment.length > 0) {
      axios
        .post(`${keys.baseURL}/BRXIArWSf2sCHprS2bQ4/newComment/${id}`, {
          comment: this.state.newComment,
          from: this.props.currentUser._id
        })
        .then(res => {
          this.setState({ newComment: "" }, () => {
            let { post } = this.props;
            axios
              .post(`${keys.baseURL}/BRXIArWSf2sCHprS2bQ4/comments/${post._id}`)
              .then(comment => {
                if (comment.data.length > 0) {
                  let comments = [...comment.data];
                  this.setState({ comments });
                }
              });
          });
        });
    }
  };

  render() {
    let { post } = this.props;
    if (!_.isEmpty(post)) {
      return (
        <div className="card mx-auto mb-3">
          <div className="card-header d-flex">
            <img
              src={post.from.photoURL}
              style={{ height: 25, borderRadius: "100%" }}
              alt="profile"
            />

            {post.to.displayName !== post.from.displayName ? (
              <div className="w-100">
                <Link to={"/people/" + post.from.uid} className="ml-2">
                  {post.from.firstName}
                </Link>
                <i className="fas fa-long-arrow-alt-right m-1 text-muted" />
                <Link to={"/people/" + post.to.uid}>{post.to.firstName}</Link>
              </div>
            ) : (
              <Link to={"/people/" + post.from.uid} className="ml-2">
                {post.from.displayName}
              </Link>
            )}
            <p
              className="text-muted small"
              style={{ position: "absolute", right: 10, top: 15 }}
            >
              {moment(post.createdAt).fromNow()}
            </p>
          </div>
          <div className="card-body">
            {/* <p>{moment(post.createdAt, "YYYYMMDD").from(moment.utc().format())}</p> */}

            <h5>{post.post}</h5>
            <label className="float-left text-muted">
              <i
                className={
                  "fas fa-heart " + (this.state.liked ? "text-danger" : "")
                }
                onClick={this.onLike}
                id={post._id}
              />
              <span
                className={
                  "badge badge-secondary bg-light text-secondary likes" +
                  post._id
                }
                id={post._id}
              >
                {this.state.total}
              </span>
            </label>
          </div>

          {this.state.comments.map((comment, index) => {
            if (index < 3) {
              return (
                <div
                  key={index}
                  className="card-footer d-flex justify-content-center align-items-center"
                >
                  <img
                    src={comment.from.photoURL}
                    style={{ height: 25, borderRadius: "100%" }}
                    alt="profile"
                  />
                  <p
                    type="text"
                    name="question"
                    className="form-control ml-3 h-auto mb-0 bg-light"
                    style={{ border: "none" }}
                    disabled
                  >
                    {comment.comment}
                  </p>
                </div>
              );
            } else {
              return "";
            }
          })}
          <div className="card-footer d-flex align-items-center">
            <img
              src={this.props.currentUser.photoURL}
              style={{ height: 25, borderRadius: "100%" }}
              alt="profile"
            />
            <form method="post" className="ml-3 w-100">
              <input
                type="text"
                placeholder="Comment ..."
                name="question"
                className="form-control"
                value={this.state.newComment}
                onChange={this.onCommentChange}
                style={{ borderRadius: "100px" }}
              />
              <button
                type="submit"
                className="form-control btn btn-dark my-3 d-none"
                onClick={this.newComment}
                id={post._id}
              >
                Share
              </button>
            </form>
          </div>
        </div>
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
)(Post);
