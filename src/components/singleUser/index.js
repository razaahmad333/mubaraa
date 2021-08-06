import React, { Component } from "react";
import "./styles/style.css";

import fh from "./images/filledHeart.png";
import eh from "./images/emptyHeart.png";

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
    };

    this.addToMyFav = this.addToMyFav.bind(this);
  }

  componentDidMount() {
    firebase
      .firestore()
      .collection("users")
      .doc(this.props.useruid)
      .onSnapshot((doc) => {
        if (this.state.isMounted) {
          this.setState({ user: doc.data() });
        }
      });
  }

  componentWillUnmount() {
    this.setState({ isMounted: false });
  }

  addToMyFav(uid) {
    const { myFavourites, me } = this.state;

    if (myFavourites.includes(uid)) {
      myFavourites.splice(myFavourites.indexOf(uid), 1);
    } else {
      myFavourites.push(uid);
    }
    this.setState({ myFavourites });
    me &&
      firebase
        .firestore()
        .collection("users")
        .doc(me.uid)
        .update({ myFavourites })
        .then(() => {
          console.log("document favourites added");
        })
        .catch((err) => {
          console.log(me.uid);
          console.log("there is some erro");
          throw err;
        });
  }

  render() {
    const { user, myFavourites } = this.state;
    return (
      <div>
        {user && (
          <div
            className={myFavourites.includes(user.uid) ? "favUser" : "oneUser"}
            key={user.uid}
          >
            <div className="row innerLayer">
              <div className="col s2">
                <img
                  alt="tasveer"
                  src={user.imageurl}
                  width={"60"}
                  height={"60"}
                  className="dp"
                />
              </div>
              <div className="col s1"></div>
              <div className="col s4 usernameo center">
                <p className="center"> {user.username.split(" ")[0]}</p>
              </div>
              <div className="col s1"></div>
              <div className="col s2 percentage">
                <p>{user.relativeToMe + "%"} </p>
              </div>
              <div className="col s1"></div>
              <div className="col s1 addBtn">
                {" "}
                <img
                  alt="dil"
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
