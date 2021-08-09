import React, { Component } from "react";
import firebase from "../../firebase/firebase";
import person from "./person.png";
import "firebase/auth";
import "firebase/firestore";
import "./styles/style.css";
import SingleUser from "../singleUser";
import LoadingRender from "../loading/loading";
import { Link } from "react-router-dom";

class PrivateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myFavourites: this.props.me.myFavourites,
      isMounted: true,
      isUploadingToFirebase: true,
      msgCount: 0,
    };
  }

  componentDidMount() {
    firebase
      .firestore()
      .collection("users")
      .doc(this.props.me.uid)
      .get()
      .then((doc) => {
        this.state.isMounted &&
          this.setState({ myFavourites: doc.data().myFavourites }, () => {
            this.state.isMounted &&
              this.setState({ isUploadingToFirebase: false });
          });
      });

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
  }

  componentWillUnmount() {
    this.setState({ isMounted: false });
  }
  render() {
    return (
      <div>
        {this.state.isUploadingToFirebase ? (
          <LoadingRender />
        ) : (
          <div>
            <div className="containerD">
              <div className="row">
                <div className="col s12 m6">
                  <img
                    alt="tasveer"
                    className="dpInPrivate"
                    src={this.props.me.imageurl || person}
                  />
                </div>
                <div className="col s12 m6">
                  <div className="row">
                    <div className="col s12  nameInPrivate">
                      {" "}
                      <div className="headingo">
                        {(this.props.me && this.props.me.username) || "User"}
                      </div>{" "}
                    </div>
                    <div className="col s12 jesusLovesYou">
                      {" "}
                      <p>
                        {this.props.me.followers + "  people likes you"}
                      </p>{" "}
                    </div>
                    <div className="col s12 btnContains">
                      <div className="btnContains">
                        <Link to="/privateProfile/messageBoard">
                          <div className="privateBtn">
                            Messages{" "}
                            {this.state.msgCount === 0 ? (
                              ""
                            ) : (
                              <span className="new red badge">
                                {" "}
                                {this.state.msgCount}
                              </span>
                            )}{" "}
                          </div>
                        </Link>{" "}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="headingo">People You have Added</div>
              <div>
                {this.state.myFavourites.length === 0
                  ? "you have added no one"
                  : ""}
              </div>
              {this.props.me &&
                this.state.myFavourites.map((uid, index) => (
                  <SingleUser
                    currentlyChattingWith={this.props.currentlyChattingWith}
                    key={uid}
                    me={this.props.me}
                    useruid={uid}
                  />
                ))}
              <div className="btnContains">
                <Link to="/privateProfile/questionBoard/showmyanswers">
                  <div className="privateBtn">My Responses</div>
                </Link>{" "}
                <Link to={`/privateProfile/questionBoard`}>
                  <div className="privateBtn">Edit Your Choices</div>
                </Link>
                <Link to="/privateProfile/createProfile">
                  <div className="privateBtn">Edit Your Name</div>
                </Link>
                <div
                  className="privateBtn"
                  onClick={() => {
                    this.props.me &&
                      firebase
                        .auth()
                        .signOut()
                        .then(() => {
                          console.log("logged out successfully");
                          // this.props.isMounted &&
                          window.location.assign(
                            window.location.protocol +
                              "//" +
                              window.location.host
                          );
                        });
                  }}
                >
                  {" "}
                  Sign Out
                </div>
              </div>{" "}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default PrivateProfile;
