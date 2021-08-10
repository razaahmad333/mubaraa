import React, { Component } from "react";
import firebase from "../../firebase/firebase";
import "firebase/firestore";
import M from "materialize-css";
class MessageText extends Component {
  constructor(props) {
    super(props);
    this.state = {
      msg: undefined,
      isMounted: true,
    };

    this.toggleMessage = this.toggleMessage.bind(this);
  }

  componentDidMount() {
    firebase
      .firestore()
      .collection("messagetexts")
      .doc(this.props.msguid)
      .onSnapshot((doc) => {
        if (doc.exists) {
          this.state.isMounted && this.setState({ msg: doc.data() });
          if (!doc.data().isSeen) {
            firebase
              .firestore()
              .collection("messagetexts")
              .doc(doc.data().uid)
              .update({ isSeen: true });
          }
          if (this.state.isMounted) {
            const modal = document.querySelectorAll(".deleteReply");
            M.Modal.init(modal, {});
          }
        }
      });
  }

  toggleMessage(tggle) {
    const msg = this.state.msg;
    // msg.isDeleted = true;

    firebase
      .firestore()
      .collection("messagetexts")
      .doc(msg.uid)
      .update({ isDeleted: tggle });
    firebase
      .firestore()
      .collection("messagetexts")
      .doc(msg.affair)
      .update({ isDeleted: tggle });
  }

  componentWillUnmount() {
    this.setState({ isMounted: false });
    this.setState = (state, callback) => {
      return;
    };
  }

  giveTextClass(isDeleted, status) {
    let cls = " waves-effect ";
    if (status === "sent") {
      cls += " modal-trigger ";
    }
    if (isDeleted) {
      cls += " deleted ";
    }

    return cls;
  }

  render() {
    return (
      <div>
        {this.state.msg && (
          <div>
            <div
              // className={
              //   this.state.msg.isDeleted
              //     ? "waves-effect modal-trigger deleted"
              //     : "waves-effect modal-trigger"
              // }
              className={this.giveTextClass(
                this.state.msg.isDeleted,
                this.state.msg.status
              )}
              data-target={this.state.msg.uid}
            >
              {this.state.msg.isDeleted
                ? "this message was deleted"
                : this.state.msg.msg}
            </div>
            <div id={this.state.msg.uid} className="deleteReply modal">
              <div className="headingo center black-text">
                {this.state.msg.msg}
              </div>
              <div className="center black-text">
                {this.state.msg.isDeleted
                  ? "let him/her see it"
                  : "he/she will not see it anymore"}
              </div>
              <div className="row ">
                <div className="col s3"></div>
                <div className="col s6">
                  <div
                    className="modalBtn"
                    onClick={() => {
                      this.state.msg.isDeleted
                        ? this.toggleMessage(false)
                        : this.toggleMessage(true);
                      console.log("is delted");
                    }}
                  >
                    {this.state.msg.isDeleted ? "Restore" : "Delete"}
                  </div>
                </div>
                <div className="col s3"></div>
              </div>
            </div>
          </div>
        )}{" "}
      </div>
    );
  }
}

export default MessageText;
