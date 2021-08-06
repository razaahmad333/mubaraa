import React, { Component } from "react";
import "./styles/style.css";
import firebase from "../../firebase/firebase";
import "firebase/auth";
import "firebase/firestore";

import HomeOnAuthentication from "./onAuthentication";
import HomeWithoutAuthentication from "./withoutAuthentication";
import LoadingRender from "../loading/loading";
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: firebase.auth().currentUser,
      isUploadingToFirebase: true,
      isMounted: true,
    };
  }

  componentDidMount() {
    console.log("cc");
    // this.setState({ isUploadingToFirebase: false });
    firebase.auth().onAuthStateChanged((user) => {
      this.state.isMounted && this.setState({ isUploadingToFirebase: false });
      if (user) {
        this.state.isMounted && this.setState({ isAuthenticated: true });
      } else {
        this.state.isMounted && this.setState({ isAuthenticated: false });
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
      <div>
        {this.state.isAuthenticated ? (
          <HomeOnAuthentication />
        ) : (
          <HomeWithoutAuthentication />
        )}
      </div>
    );
  }
}

export default Home;
