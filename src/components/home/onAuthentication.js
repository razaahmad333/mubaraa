import React, { Component } from "react";
import { Link } from "react-router-dom";
import firebase from "../../firebase/firebase";
import "firebase/auth";
import "firebase/firestore";
import LoadingRender from "../loading/loading";

import "./styles/style.css";
import SingleUser from "../singleUser";
import M from "materialize-css";
function quickSortIt(arr) {
  if (arr.length < 2) {
    return arr;
  }
  let middle = arr[Math.floor(arr.length / 2)];
  let left = [];
  let right = [];
  for (let i = 0; i < arr.length; i++) {
    if (i === Math.floor(arr.length / 2)) continue;
    if (middle.relativeToMe > arr[i].relativeToMe) {
      left.push(arr[i]);
    }
    if (middle.relativeToMe <= arr[i].relativeToMe) {
      right.push(arr[i]);
    }
  }

  return quickSortIt(right).concat([middle]).concat(quickSortIt(left));
}

class HomeOnAuthentication extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      isUploadingToFirebase: true,
      isMounted: true,
      msgCount: 0,
    };

    this.calculateRelativeToMe = this.calculateRelativeToMe.bind(this);
  }

  calculateRelativeToMe(users, me) {
    users.forEach((usero) => {
      let commonAnswers = 0;
      let uncommonAnswers = 0;
      usero.userAnswers.forEach((uans, idx) => {
        if (
          uans !== -1 &&
          me.userAnswers[idx] !== -1 &&
          uans === me.userAnswers[idx]
        ) {
          commonAnswers++;
        } else if (
          (uans !== -1 && me.userAnswers[idx] === -1) ||
          (uans === -1 && me.userAnswers[idx] !== -1) ||
          uans !== me.userAnswers[idx]
        ) {
          uncommonAnswers++;
        }
      });

      if (commonAnswers === 0 && uncommonAnswers === 0) {
        usero.relativeToMe = 0;
      } else {
        usero.relativeToMe = Math.ceil(
          (commonAnswers / (commonAnswers + uncommonAnswers)) * 100
        );
      }
      this.state.isMounted &&
        firebase
          .firestore()
          .collection("users")
          .doc(usero.uid)
          .update(usero)
          .then(() => {
            console.log("udpated");
          });
    });

    users = quickSortIt(users);

    this.state.isMounted &&
      this.setState({ users }, () => {
        this.setState({ isUploadingToFirebase: false });
      });
  }

  componentDidMount() {
    var elems = document.querySelectorAll(".fixed-action-btn");
    M.FloatingActionButton.init(elems, {});

    firebase
      .firestore()
      .collection("messages")
      .doc(this.props.me.uid)
      .onSnapshot((doc) => {
        if (doc.exists) {
          Object.keys(doc.data()).forEach((dost) => {
            let uido = doc.data()[dost].pop().uid;
            firebase
              .firestore()
              .collection("messagetexts")
              .doc(uido)
              .onSnapshot((docs) => {
                if (docs.exists) {
                  console.log(docs.data());
                  if (!docs.data().isSeen) {
                    if (this.state.isMounted) {
                      let msgCount = this.state.msgCount;
                      msgCount++;
                      this.setState({ msgCount });
                    }
                  }
                }
              });
          });
        }
      });

    firebase
      .firestore()
      .collection("users")
      .get()
      .then((docos) => {
        let users = [];
        docos.docs.forEach((doco) => {
          if (this.props.me.uid !== doco.id && doco.data().creation) {
            users.push(doco.data());
          }
          if (this.state.isMounted) {
            this.setState({ isUploadingToFirebase: false });
          }
        });
        this.calculateRelativeToMe(users, this.props.me);
      });
  }

  componentWillUnmount() {
    this.setState({ isMounted: false });
  }

  render() {
    return (
      <div className="containerD">
        {this.state.isUploadingToFirebase ? (
          <LoadingRender />
        ) : (
          <div>
            <div className="fixed-action-btn">
              <Link
                to="/privateProfile/messageBoard"
                className={
                  this.state.msgCount === 0
                    ? "btn-floating btn-large black"
                    : "btn-floating btn-large  red"
                }
              >
                <i className="large material-icons">chat </i>{" "}
              </Link>
            </div>
            <p className="headingo">
              {this.props.me.username + ",  now you can see people like you !"}
            </p>
            <div>
              {this.state.users.map((user, index) => (
                <SingleUser
                  currentlyChattingWith={this.props.currentlyChattingWith}
                  key={index}
                  useruid={user.uid}
                  me={this.props.me}
                />
              ))}{" "}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default HomeOnAuthentication;
