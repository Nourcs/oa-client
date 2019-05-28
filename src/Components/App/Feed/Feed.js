import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { fetchUser } from "../../../Redux/Modules/Auth/auth";
import Post from "../Profile/Post";
import axios from "axios";
import keys from "../../../Config/keys";
class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      following: [],
      posts: []
    };
  }

  componentDidMount() {
    let { following } = this.props.currentUser;
    axios
      .post(`${keys.baseURL}/BRXIArWSf2sCHprS2bQ4/feedPosts`, { following })
      .then(res => {
        let posts = [...this.state.posts, ...res.data];
        this.setState({ posts });
      });
  }

  render() {
    return (
      <Fragment>
        <div className="container mt-5">
          <div className="row">
            <div className="col-8 offset-2">
              {this.state.posts.map((item, index) => {
                return <Post post={item} key={index} />;
              })}
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
