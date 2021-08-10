import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/home";
import Navigation from "./components/navigation";
import PrivateProfile from "./components/privateProfile";
import ChooseDp from "./components/profile/chooseDp";
import CreateProfile from "./components/profile/createProfile";
import QuestionBoard from "./components/questionBoard";
import ShowMyAnswers from "./components/showMyAnswers";
import firebase from "./firebase/firebase";
import "firebase/auth";
import "firebase/firestore";
import LoginPage from "./components/login";
// import M from "materialize-css";
// import "./App.css";

// import uuid from "react-uuid";
import LoadingRender from "./components/loading/loading";
import MessageBoard from "./components/messages";
import ChatRoom from "./components/messages/chatroom";
import AboutUs from "./components/about";

class Pairome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMounted: true,
      isAuthenticated: firebase.auth().currentUser,
      isUploadingToFirebase: true,
      myFavourites: [],
      me: [],
      friend: undefined,
      msgCount: 0,
    };
  }
  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      this.state.isMounted && this.setState({ isUploadingToFirebase: true });
      if (user) {
        firebase
          .firestore()
          .collection("usersuid")
          .doc(user.uid)
          .get()
          .then((docs) => {
            firebase
              .firestore()
              .collection("users")
              .doc(docs.data().uid)
              .update({ online: true });
            firebase
              .firestore()
              .collection("users")
              .doc(docs.data().uid)
              .onSnapshot((doc) => {
                firebase
                  .firestore()
                  .collection("messages")
                  .doc(doc.data().uid)
                  .onSnapshot((doces) => {
                    if (doces.exists) {
                      this.state.isMounted && this.setState({ msgCount: 0 });
                      Object.keys(doces.data()).forEach((dost) => {
                        let uido = doces.data()[dost].pop().uid;
                        firebase
                          .firestore()
                          .collection("messagetexts")
                          .doc(uido)
                          .onSnapshot((docso) => {
                            if (docso.exists) {
                              if (!docso.data().isSeen) {
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

                if (this.state.isMounted) {
                  this.setState({ isAuthenticated: true });
                  this.setState({ currentDp: doc.data().imageurl });
                  this.setState({ me: doc.data() }, () => {
                    this.setState({ isUploadingToFirebase: false });
                  });
                  this.setState({ myFavourites: doc.data().myFavourites });
                }
              });
          })
          .catch((err) => {
            console.log("no data found");
          });
      } else {
        if (this.state.isMounted) {
          this.setState({ isAuthenticated: false });
          this.setState({ isUploadingToFirebase: false });
        }
      }
    });
  }
  componentWillUnmount() {
    this.setState({ isMounted: false });
    firebase.auth().currentUser &&
      firebase
        .firestore()
        .collection("users")
        .doc(this.state.me.uid)
        .update({ online: false });
    console.log("unmonted");
    this.setState = (state, callback) => {
      return;
    };
  }

  render() {
    return this.state.isUploadingToFirebase ? (
      <LoadingRender />
    ) : (
      <Router>
        <Navigation
          msgCount={this.state.msgCount}
          isAuthenticated={this.state.isAuthenticated}
          me={this.state.me}
        />
        <div className="containerD">
          <Switch>
            <Route exact path="/">
              <Home
                msgCount={this.state.msgCount}
                me={this.state.me}
                isAuthenticated={this.state.isAuthenticated}
                currentlyChattingWith={(friend) => {
                  this.setState({ friend: friend });
                }}
              />
            </Route>
            <Route exact path="/privateProfile">
              {this.state.isAuthenticated ? (
                <PrivateProfile
                  msgCount={this.state.msgCount}
                  me={this.state.me}
                  currentlyChattingWith={(friend) => {
                    this.setState({ friend: friend });
                  }}
                />
              ) : (
                <LoadingRender />
              )}
            </Route>
            <Route exact path={`/privateProfile/questionBoard`}>
              {" "}
              <QuestionBoard
                userAnswers={this.state.me.userAnswers}
                sendTo={"/privateProfile/questionBoard/showmyanswers"}
              />
            </Route>
            <Route exact path="/questionBoard/showmyanswers">
              <ShowMyAnswers userAnswers={this.state.me.userAnswers} />
            </Route>

            <Route exact path="/privateProfile/questionBoard/showmyanswers">
              <ShowMyAnswers
                sendToEdit={"/privateProfile/questionBoard"}
                sendTo={"/privateProfile"}
                userAnswers={this.state.me.userAnswers}
              />
            </Route>
            <Route exact path="/questionBoard">
              <QuestionBoard
                userAnswers={
                  this.state.isAuthenticated
                    ? this.state.me.userAnswers
                    : undefined
                }
              />
            </Route>
            <Route exact path="/privateProfile/createProfile">
              <CreateProfile me={this.state.me} sendTo={"/privateProfile"} />
            </Route>
            <Route exact path="/questionBoard/showmyanswers/createProfile">
              <CreateProfile me={this.state.me} />
            </Route>
            <Route
              exact
              path="/questionBoard/showmyanswers/createProfile/choosedp"
            >
              <ChooseDp me={this.state.me} />
            </Route>

            <Route path="/privateProfile/createProfile/choosedp">
              <ChooseDp sendTo={"/privateProfile"} me={this.state.me} />
            </Route>

            <Route exact path="/privateProfile/messageBoard">
              <MessageBoard
                me={this.state.me}
                currentlyChattingWith={(friend) => {
                  this.setState({ friend: friend });
                }}
              />
            </Route>

            <Route exact path="/privateProfile/messageBoard/chatRoom">
              <ChatRoom me={this.state.me} friend={this.state.friend} />
            </Route>
            <Route exact path="/loginPage" component={LoginPage}></Route>
            <Route exact path="/aboutus" component={AboutUs}></Route>
          </Switch>
        </div>{" "}
        {
          window.location.pathname.includes("messageBoard") ? "" : ""
          // <div className="fixed-action-btn">
          //   <Link
          //     to="/privateProfile/messageBoard"
          //     className={
          //       this.state.msgCount === 0
          //         ? "btn-floating btn-large black"
          //         : "btn-floating btn-large  red"
          //     }
          //   >
          //     <i className="large material-icons">chat </i>{" "}
          //   </Link>
          // </div>
        }
      </Router>
    );
  }
}

export default Pairome;
