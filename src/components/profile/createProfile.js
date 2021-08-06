import { Component, React } from "react";
import "./style/style.css";

import firebase from "../../firebase/firebase";
import "firebase/auth";
import "firebase/firestore";
import LoadingRender from "../loading/loading";
import abusiveFilter from "./abusiveFilter";
class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showpwd: !false,
      next: false,
      message: "",
      username: this.props.me.username,
      pwd: this.props.me.pwd,
      isUploadingToFirebase: true,
      isMounted: true,
      allUsernames: [],
    };

    this.submitTheProfile = this.submitTheProfile.bind(this);
  }

  componentDidMount() {
    document.querySelector("#username") &&
      document.querySelector("#username").focus();

    firebase
      .firestore()
      .collection("users")
      .get()
      .then((doc) => {
        console.log(doc.docs);

        const allUsernames = doc.docs.map((doco) =>
          doco.data().username.toLowerCase()
        );

        this.state.isMounted &&
          this.setState({ allUsernames }, () => {
            this.state.isMounted &&
              this.setState({ isUploadingToFirebase: false });
          });
      });
  }

  submitTheProfile(choosedp) {
    // e.preventDefault();
    const { username, pwd, allUsernames } = this.state;
    if (username.length === 0) {
      this.setState({ message: "please enter username" });
      return;
    }
    if (pwd.length === 0) {
      this.setState({ message: "please enter password" });
      return;
    }
    if (username.includes(" ")) {
      this.setState({ message: "username cant have space" });

      return;
    }
    if (allUsernames.includes(username.toLowerCase())) {
      this.setState({ message: "username not available" });

      return;
    }
    if (abusiveFilter(username.toLowerCase())) {
      this.setState({ message: "please use appropriate username" });
      return;
    }

    const user = firebase.auth().currentUser;
    if (user) {
      this.setState({ isUploadingToFirebase: true });

      firebase
        .firestore()
        .collection("users")
        .doc(this.props.me.uid)
        .update({ username, pwd })
        .then(() => {
          console.log("user updated created");
          if (this.state.isMounted) {
            if (choosedp && this.props.sendTo) {
              window.location.assign(
                window.location.protocol +
                  "//" +
                  window.location.host +
                  (this.props.sendTo + "/createProfile/choosedp")
              );
            }

            if (choosedp && !this.props.sendTo) {
              window.location.assign(
                window.location.protocol +
                  "//" +
                  window.location.host +
                  "/questionBoard/showmyanswers/createProfile/choosedp"
              );
            }

            if (!choosedp && this.props.sendTo) {
              window.location.assign(
                window.location.protocol +
                  "//" +
                  window.location.host +
                  this.props.sendTo
              );
            }
          }
        })
        .catch((err) => {
          throw err;
        });
    }
  }
  componentWillUnmount() {
    this.setState({ isMounted: false });
  }

  render() {
    return (
      <div>
        {" "}
        {this.state.isUploadingToFirebase ? (
          <LoadingRender />
        ) : (
          <div className="containerD">
            <p className="center headingo">Complete Your Profile</p>
            {!this.state.next ? (
              <div>
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
                      this.setState({ pwd: e.target.value });
                      this.setState({ message: "" });
                    }}
                    value={this.state.pwd}
                    id="password"
                  />
                </div>
                <div className="row">
                  <div className="col s1">
                    <span
                      className={
                        this.state.showpwd
                          ? "col s1 checked"
                          : "col s1 unchecked"
                      }
                      onClick={() => {
                        const showpwd = !this.state.showpwd;
                        this.setState({ showpwd });
                      }}
                    ></span>
                  </div>
                  <div className="col s1"></div>
                  <div className="col s10 pwdnvg">
                    {this.state.showpwd ? "Hide Password" : "Show Password"}
                  </div>
                </div>
                {this.state.message.length > 0 && (
                  <div className="messageLogin">{this.state.message}</div>
                )}
                <div
                  className="submitButton center"
                  onClick={() => {
                    this.submitTheProfile(true);
                    this.setState({ next: !true });
                  }}
                >
                  {this.props.sendTo ? "Change Dp" : "Choose Dp"}
                </div>
                {this.props.sendTo && (
                  <div
                    className="submitButton center"
                    onClick={() => {
                      this.submitTheProfile(false);
                      this.setState({ next: !true });
                    }}
                  >
                    Save{" "}
                  </div>
                )}
              </div>
            ) : (
              <div></div>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default CreateProfile;
