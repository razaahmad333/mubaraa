import React, { Component } from "react";
import firebase from "../../firebase/firebase";
import "firebase/auth";
import "firebase/firestore";
import LoadingRender from "../loading/loading";

import "./styles/style.css";
import SingleUser from "../singleUser";

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
      currentUserName: "Guest",
      myFavourites: [],
      me: undefined,
      isMounted: true,
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
  }

  sortByPercentage(users) {
    let ptgarr = [];
    for (let user of users) {
      ptgarr.push(user.relativeToMe);
    }

    let newPtgarr = ptgarr.sort();
    console.log(newPtgarr);
    let newUsers = Array(users.length).fill(undefined);
    let idx;
    for (let i = 0; i < users.length; i++) {
      idx = newPtgarr.indexOf(users[i].relativeToMe);
      newUsers[idx] = users[i];
    }

    return newUsers;
  }

  componentDidMount() {
    firebase
      .firestore()
      .collection("users")
      .get()
      .then((doc) => {
        let me;
        let users = [];
        doc.docs.map((doco) => {
          if (
            firebase.auth().currentUser.uid !== doco.id &&
            doco.data().creation
          ) {
            users.push(doco.data());
          } else if (firebase.auth().currentUser.uid === doco.id) {
            me = doco.data();
            if (this.state.isMounted) {
              this.setState({ myFavourites: me.myFavourites });
              this.setState({ me });
              this.setState({ isUploadingToFirebase: false });
              this.setState({ currentUserName: doco.data().username });
            }
          }
        });
        this.calculateRelativeToMe(users, me);
        users = quickSortIt(users);
        this.state.isMounted && this.setState({ users });
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
          <div className="containerD">
            <p className="headingo">
              {this.state.currentUserName +
                ",  now you can see people like you !"}
            </p>
            <div className="userslikeyou">
              {this.state.users.map((user, index) => (
                <SingleUser key={index} useruid={user.uid} me={this.state.me} />
              ))}{" "}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default HomeOnAuthentication;
