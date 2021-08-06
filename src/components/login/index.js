import React, { Component } from "react";
import LoadingRender from "../loading/loading";
import firebase from "../../firebase/firebase";
import "firebase/auth";
import "firebase/firestore";

import "./styles/style.css";

class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      pwd: "",
      isUploadingToFirebase: true,
      allUsers: [],
      allUsernames: [],
      allPasswords: [],
      allUids: [],
      isMounted: true,
      message: "",
    };

    this.loginPlease = this.loginPlease.bind(this);
  }

  componentDidMount() {
    firebase
      .firestore()
      .collection("users")
      .get()
      .then((doc) => {
        const allUsers = doc.docs.map((doco) => doco.data());
        const allUsernames = doc.docs.map((doco) =>
          doco.data().username.toLowerCase()
        );
        const allPasswords = doc.docs.map((doco) => doco.data().pwd);
        const allUids = doc.docs.map((doco) => doco.data().uid);

        if (this.state.isMounted) {
          this.setState({ allUsers });
          this.setState({ allUsernames });
          this.setState({ allPasswords });
          this.setState({ allUids });
          this.setState({ isUploadingToFirebase: false });
        }
      });
  }

  componentWillUnmount() {
    this.setState({ isMounted: false });
  }

  loginPlease() {
    if (this.state.username.length === 0) {
      this.setState({ message: "please enter username" });
      return;
    }
    if (this.state.pwd.length === 0) {
      this.setState({ message: "please enter password" });
      return;
    }

    const idx = this.state.allUsernames.indexOf(
      this.state.username.toLowerCase()
    );
    if (idx !== -1) {
      if (this.state.allPasswords[idx] === this.state.pwd) {
        console.log("loggin ");
      } else {
        this.setState({ message: "you have entered wrong password" });
      }
    } else {
      this.setState({ message: "nothing is available with this username" });
    }
  }
  render() {
    return (
      <div>
        {this.state.isUploadingToFirebase ? (
          <LoadingRender />
        ) : (
          <div className="containerD">
            <p className="headingo center">Login to Mubaraah</p>
            <div>
              <p className="inputLabel">Username</p>
              <input
                type="text"
                name="username"
                placeholder="enter a unique username"
                onChange={(e) => {
                  this.setState({ username: e.target.value });
                  this.setState({ message: "" });
                }}
                value={this.state.username}
                id="username"
              />
            </div>
            <div>
              <p className="inputLabel">Password</p>
              <input
                type={this.state.showpwd ? "text" : "password"}
                name="pwd"
                placeholder="enter a unique password"
                onChange={(e) => {
                  this.setState({ message: "" });
                  this.setState({ pwd: e.target.value });
                }}
                value={this.state.pwd}
                id="password"
              />
            </div>
            {this.state.message.length > 0 && (
              <div className="messageLogin">{this.state.message}</div>
            )}
            <div className="btnContains">
              <div className="privateBtn" onClick={this.loginPlease}>
                Login
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default LoginPage;
