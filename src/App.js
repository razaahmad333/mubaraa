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

class Pairome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDp: undefined,
      isMounted: true,
    };
  }
  componentDidMount() {
    const user = firebase.auth().currentUser;
    user &&
      firebase
        .firestore()
        .collection("users")
        .doc(user.uid)
        .onSnapshot((doc) => {
          this.state.isMounted &&
            this.setState({ currentDp: doc.data().imageurl });
        });
    // firebase.auth().onAuthStateChanged((user) => {
    //   if (user) {
    //     firebase
    //       .firestore()
    //       .collection("users")
    //       .doc(user.uid)
    //       .get()
    //       .then((doc) => {
    //         console.log("set");
    //         this.setState({ currentDp: doc.data().imageurl });
    //       });
    //   }
    // });
  }
  componentWillUnmount() {
    this.setState({ isMounted: false });
  }

  render() {
    return (
      <Router>
        <Navigation />
        <div className="containerD">
          <Switch>
            <Route exact path="/" component={Home}></Route>
            <Route
              exact
              path="/questionBoard"
              component={QuestionBoard}
            ></Route>
            <Route
              exact
              path="/questionBoard/showmyanswers"
              component={ShowMyAnswers}
            ></Route>
            <Route
              exact
              path="/questionBoard/showmyanswers/createProfile/choosedp"
              component={ChooseDp}
            ></Route>
            <Route exact path="/questionBoard/showmyanswers/createProfile">
              <CreateProfile />
            </Route>
            <Route
              exact
              path="/privateProfile"
              component={PrivateProfile}
            ></Route>

            <Route path="/privateProfile/createProfile/choosedp">
              <ChooseDp
                sendTo={"/privateProfile"}
                currentDp={this.state.currentDp}
              />
            </Route>
            <Route exact path="/privateProfile/createProfile">
              <CreateProfile sendTo={"/privateProfile"} />
            </Route>

            <Route exact path="/loginPage" component={LoginPage}></Route>

            <Route exact path={`/privateProfile/questionBoard`}>
              {" "}
              <QuestionBoard
                sendTo={"/privateProfile/questionBoard/showmyanswers"}
              />
            </Route>
            <Route exact path="/privateProfile/questionBoard/showmyanswers">
              <ShowMyAnswers
                sendToEdit={"/privateProfile/questionBoard"}
                sendTo={"/privateProfile"}
              />
            </Route>
          </Switch>
        </div>{" "}
      </Router>
    );
  }
}

export default Pairome;
