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

// import uuid from "react-uuid";
import LoadingRender from "./components/loading/loading";

class Pairome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDp: undefined,
      isMounted: true,
      isAuthenticated: firebase.auth().currentUser,
      isUploadingToFirebase: true,
      myFavourites: [],
      me: [],
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
              .onSnapshot((doc) => {
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
  }

  render() {
    return this.state.isUploadingToFirebase ? (
      <LoadingRender />
    ) : (
      <Router>
        <Navigation
          isAuthenticated={this.state.isAuthenticated}
          me={this.state.me}
        />
        <div className="containerD">
          <Switch>
            <Route exact path="/">
              <Home
                me={this.state.me}
                isAuthenticated={this.state.isAuthenticated}
              />
            </Route>
            <Route exact path="/privateProfile">
              {this.state.isAuthenticated ? (
                <PrivateProfile me={this.state.me} />
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

            <Route exact path="/loginPage" component={LoginPage}></Route>
          </Switch>
        </div>{" "}
      </Router>
    );
  }
}

export default Pairome;
