import React, { Component } from "react";
import person from "../navigation/person.png";
import "./styles/style.css";
import uuid from "react-uuid";
import firebase from "../../firebase/firebase";
import "firebase/firestore";
import MessageText from "./messagetxt";
// import M from "materialize-css";
class ChatRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      friend: this.props.friend,
      isMounted: true,
      msg: "",
      messages: [],
    };
    this.sendTheMessage = this.sendTheMessage.bind(this);
  }

  componentDidMount() {
    firebase
      .firestore()
      .collection("currentlyChatWith")
      .doc(this.props.me.uid)
      .get()
      .then((doc) => {
        this.state.isMounted && this.setState({ friend: doc.data() });
        firebase
          .firestore()
          .collection("messages")
          .doc(this.props.me.uid)
          .onSnapshot((docs) => {
            if (docs.exists) {
              this.state.isMounted &&
                this.setState({ messages: docs.data()[doc.data().uid] });
              document.querySelector(".trasho") &&
                document.querySelector(".trasho").scrollIntoView({
                  behavior: "auto",
                });
            }
          })
          .catch((e) => {
            console.log("no error found");
          });
      })
      .catch((err) => {
        console.log("some failure");
      });
  }

  sendTheMessage() {
    if (this.state.msg.length === 0) return;
    const msg = this.state.msg;
    this.state.isMounted && this.setState({ msg: "" });
    const uido2 = uuid();
    const uido1 = uuid();
    firebase
      .firestore()
      .collection("messages")
      .doc(this.props.me.uid)
      .get()
      .then((doc) => {
        if (doc.exists) {
          firebase
            .firestore()
            .collection("messages")

            .doc(this.props.me.uid)
            .update({
              [this.state.friend.uid]: firebase.firestore.FieldValue.arrayUnion(
                {
                  uid: uido1,
                  affair: uido2,
                  createdAt: firebase.firestore.Timestamp.now(),
                  isDeleted: false,
                  isSeen: false,
                  msg,
                  status: "sent",
                }
              ),
            })
            .then(() => {
              firebase.firestore().collection("messagetexts").doc(uido1).set({
                createdAt: firebase.firestore.Timestamp.now(),
                isDeleted: false,
                msg,
                isReplied: false,
                status: "sent",
                uid: uido1,
                affair: uido2,
                isHighlighted: false,
                isSeen: false,
                isAddedToFav: false,
              });
            })
            .catch((err) => {
              console.log("update not succesfull");
            });
        } else {
          firebase
            .firestore()
            .collection("messages")
            .doc(this.props.me.uid)
            .set({
              [this.state.friend.uid]: [
                {
                  uid: uido1,
                  createdAt: firebase.firestore.Timestamp.now(),
                  affair: uido2,
                  isDeleted: false,
                  isSeen: false,
                  msg,
                  status: "sent",
                },
              ],
            })
            .then(() => {
              firebase.firestore().collection("messagetexts").doc(uido1).set({
                createdAt: firebase.firestore.Timestamp.now(),
                isDeleted: false,
                msg,
                isReplied: false,
                status: "sent",
                uid: uido1,
                affair: uido2,
                isSeen: false,
                isHighlighted: false,
                isAddedToFav: false,
              });
            })
            .catch((err) => {
              console.log("sent not succesfull");
            });
        }
      });

    firebase
      .firestore()
      .collection("messages")
      .doc(this.state.friend.uid)
      .get()
      .then((doc) => {
        if (doc.exists) {
          firebase
            .firestore()
            .collection("messages")

            .doc(this.state.friend.uid)
            .update({
              [this.props.me.uid]: firebase.firestore.FieldValue.arrayUnion({
                createdAt: firebase.firestore.Timestamp.now(),
                isDeleted: false,
                uid: uido2,
                affair: uido1,
                msg,
                isSeen: false,
                status: "recieved",
              }),
            })
            .then(() => {
              firebase.firestore().collection("messagetexts").doc(uido2).set({
                createdAt: firebase.firestore.Timestamp.now(),
                isDeleted: false,
                msg,
                isReplied: false,
                status: "recieved",
                uid: uido2,
                affair: uido1,
                isHighlighted: false,
                isSeen: false,
                isAddedToFav: false,
              });
            })
            .catch((err) => {
              console.log("update not succesfull");
            });
        } else {
          firebase
            .firestore()
            .collection("messages")
            .doc(this.state.friend.uid)
            .set({
              [this.props.me.uid]: [
                {
                  createdAt: firebase.firestore.Timestamp.now(),
                  uid: uido2,
                  affair: uido1,
                  isDeleted: false,
                  isSeen: false,
                  msg,
                  status: "recieved",
                },
              ],
            })
            .then(() => {
              firebase.firestore().collection("messagetexts").doc(uido2).set({
                createdAt: firebase.firestore.Timestamp.now(),
                isDeleted: false,
                msg,
                isReplied: false,
                status: "recieved",
                uid: uido2,
                affair: uido1,
                isSeen: false,
                isHighlighted: false,
                isAddedToFav: false,
              });
            })
            .catch((err) => {
              console.log("sent not succesfull");
            });
        }
      });
  }
  componentWillUnmount() {
    this.setState({ isMounted: false });
  }

  render() {
    this.state.isMounted &&
      document.querySelector(".trasho") &&
      document.querySelector(".trasho").scrollIntoView({
        behavior: "auto",
      });
    return (
      <div className="containerD">
        <div className="chatroomContainer">
          <div className="row ">
            <div className="col s12 friendCred">
              <div className="row">
                <div className="col s3">
                  <img
                    alt="dost"
                    src={
                      (this.state.friend && this.state.friend.imageurl) ||
                      person
                    }
                    width="50px"
                    height="50px"
                    className="circle friendDp"
                  />
                </div>
                <div className="col s9 ">
                  <p className="friendName">
                    {this.state.friend ? this.state.friend.username : "User"}
                  </p>
                </div>
              </div>
            </div>

            <div className="col s12 chats">
              <div className="row">
                {this.state.messages &&
                  this.state.messages.map((msg, idx) =>
                    msg.status === "sent" ? (
                      <div className="col s12 " key={idx}>
                        <div className="row">
                          <div className="col s4"></div>{" "}
                          <div className="col s8">
                            <div className="sentM">
                              <div className="txt sent">
                                <MessageText msguid={msg.uid} status={"sent"} />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="col s12 " key={idx}>
                        <div className="row">
                          <div className="col s8">
                            <div className="receivedR">
                              <div className="txt received">
                                <MessageText
                                  msguid={msg.uid}
                                  status={"received"}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="col s4"></div>{" "}
                        </div>
                      </div>
                    )
                  )}{" "}
              </div>
              <div className="trasho"></div>
            </div>
            <div className="col s12 chatInputSystem">
              <div className=" row">
                <div className="col s10">
                  <input
                    onChange={(e) => {
                      this.setState({ msg: e.target.value });
                    }}
                    value={this.state.msg}
                    className="browser-default chatInput    "
                    placeholder="write your  message"
                    type="text"
                  />
                </div>
                <div className="col s2">
                  <div
                    className="sendBtn"
                    onClick={() => {
                      this.sendTheMessage();
                    }}
                  >
                    Send
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ChatRoom;
