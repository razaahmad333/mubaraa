import React, { Component } from "react";
import firebase from "../../firebase/firebase";
import "firebase/auth";
import "firebase/firestore";
import SingleUser from "../singleUser";
class MessageBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chatsWith: [],
      isUploadingToFirebase: true,
      isMounted: true,
    };
  }
  componentDidMount() {
    firebase
      .firestore()
      .collection("messages")
      .doc(this.props.me.uid)
      .get()
      .then((doc) => {
        if (this.state.isMounted) {
          if (doc.exists) {
            this.setState({ chatsWith: Object.keys(doc.data()) });
          } else {
          }
        }
      });
  }
  componentWillUnmount() {
    this.setState({ isMounted: false });
    this.setState = (state, callback) => {
      return;
    };
  }
  render() {
    return (
      <div className="containerD">
        <div className="headingo">Message Box</div>
        {this.state.chatsWith.length === 0 && (
          <div className="center">
            <div className="center"> you have no messages yet </div>
            <div className="center">
              {" "}
              click on anyone dp to start conversation{" "}
            </div>{" "}
          </div>
        )}
        {this.state.chatsWith.map((friend, idx) => (
          <div key={idx}>
            <SingleUser
              currentlyChattingWith={this.props.currentlyChattingWith}
              useruid={friend}
              me={this.props.me}
            />
          </div>
        ))}
      </div>
    );
  }
}

export default MessageBoard;
