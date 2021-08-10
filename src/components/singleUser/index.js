import React, { Component } from "react";
import "./styles/style.css";
import { Link } from "react-router-dom";
import fh from "./images/filledHeart.png";
import eh from "./images/emptyHeart2.png";

import firebase from "../../firebase/firebase";
import "firebase/auth";
import "firebase/firestore";

class SingleUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: undefined,
      myFavourites: this.props.me.myFavourites,
      me: this.props.me,
      isMounted: true,
      newMessage: false,
      newMsgCount: 0,
    };

    this.addToMyFav = this.addToMyFav.bind(this);
  }

  componentDidMount() {
    firebase
      .firestore()
      .collection("users")
      .doc(this.props.useruid)
      .get()
      .then((doc) => {
        this.state.isMounted && this.setState({ user: doc.data() });
      });

    firebase
      .firestore()
      .collection("messages")
      .doc(this.props.me.uid)
      .onSnapshot((doc) => {
        if (doc.exists) {
          const msgsuids =
            doc.data()[this.props.useruid] &&
            doc.data()[this.props.useruid].pop();
          // console.log(msgsuids.uid);
          if (doc.data()[this.props.useruid]) {
            doc.data()[this.props.useruid].forEach((msguido) => {
              firebase
                .firestore()
                .collection("messagetexts")
                .doc(msguido.uid)
                .onSnapshot((docs) => {
                  if (docs.exists) {
                    let newMsgCount = this.state.newMsgCount;
                    if (!docs.data().isSeen) {
                      newMsgCount++;
                      if (this.state.isMounted) {
                        this.setState({ newMsgCount });
                      }
                    }
                  }
                });
            });
          }

          msgsuids &&
            firebase
              .firestore()
              .collection("messagetexts")
              .doc(msgsuids.uid)
              .onSnapshot((docs) => {
                if (docs.exists) {
                  // console.log(docs.data());
                  this.state.isMounted &&
                    this.setState({ newMessage: !docs.data().isSeen });
                }
              });
        }
      });
  }

  componentWillUnmount() {
    this.setState({ isMounted: false });
    this.setState = (state, callback) => {
      return;
    };
  }

  addToMyFav(uid) {
    const { myFavourites, me } = this.state;
    let incr = 0;
    if (myFavourites.includes(uid)) {
      myFavourites.splice(myFavourites.indexOf(uid), 1);
      incr = -1;
    } else {
      myFavourites.push(uid);
      incr = 1;
    }
    this.state.isMounted && this.setState({ myFavourites });
    me &&
      firebase
        .firestore()
        .collection("users")
        .doc(me.uid)
        .update({
          myFavourites,
          following: firebase.firestore.FieldValue.increment(incr),
        })
        .then(() => {
          console.log("document favourites added");
        })
        .catch((err) => {
          // console.log(me.uid);
          console.log("there is some erro");
          throw err;
        });

    firebase
      .firestore()
      .collection("users")
      .doc(uid)
      .update({
        followers: firebase.firestore.FieldValue.increment(incr),
      })
      .then(() => {
        console.log("document favourites added");
      })
      .catch((err) => {
        console.log(uid);
        console.log("there is some erro");
        throw err;
      });
  }

  render() {
    const user = this.state.user;
    const myFavourites = this.props.me.myFavourites;
    return (
      <div>
        {user && (
          <div
            className={myFavourites.includes(user.uid) ? "favUser" : "oneUser"}
            key={user.uid}
          >
            <div className="row innerLayer">
              <div className="col s2">
                <Link to="/privateProfile/messageBoard/chatRoom">
                  {" "}
                  <img
                    alt="tasveer"
                    src={user.imageurl}
                    width={"60"}
                    height={"60"}
                    className="dp"
                    onClick={() => {
                      this.props.currentlyChattingWith(user);
                      firebase
                        .firestore()
                        .collection("currentlyChatWith")
                        .doc(this.props.me.uid)
                        .set(user);
                    }}
                  />
                </Link>
              </div>
              {/* <div className="col s1"></div> */}
              <div className="col s5 ">
                <div className="usernameo">
                  <p> {user.username.split(" ")[0]}</p>
                  {this.state.newMessage ? (
                    <Link to="/privateProfile/messageBoard/chatRoom">
                      <div
                        className="newMessage"
                        onClick={() => {
                          this.props.currentlyChattingWith(user);
                          firebase
                            .firestore()
                            .collection("currentlyChatWith")
                            .doc(this.props.me.uid)
                            .set(user);
                        }}
                      >
                        {this.state.newMsgCount + " new messages"}
                      </div>
                    </Link>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className="col s2 percentage">
                <p>{user.relativeToMe + "%"}</p>
              </div>
              <div className="col s1"></div>
              <div className="col s2 addBtn">
                {" "}
                <img
                  alt="dil"
                  width={"50px"}
                  src={myFavourites.includes(user.uid) ? fh : eh}
                  onClick={() => {
                    this.addToMyFav(user.uid);
                  }}
                />{" "}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default SingleUser;
