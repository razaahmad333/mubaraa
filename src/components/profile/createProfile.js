import { Component, React } from "react";
import "./style/style.css";

import firebase from "../../firebase/firebase";
import "firebase/auth";
import "firebase/firestore";
import LoadingRender from "../loading/loading";

class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showpwd: !false,
      next: false,
      username: "guest1",
      pwd: "0000",
      isUploadingToFirebase: true,
      isMounted: true,
    };

    this.submitTheProfile = this.submitTheProfile.bind(this);
  }

  componentDidMount() {
    document.querySelector("#username") &&
      document.querySelector("#username").focus();

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        firebase
          .firestore()
          .collection("users")
          .doc(user.uid)
          .onSnapshot((doc) => {
            if (this.state.isMounted) {
              this.setState({ isUploadingToFirebase: false });

              this.setState({
                username: doc.data().username,
                pwd: doc.data().pwd,
              });
              document.querySelector("#username") &&
                document.querySelector("#username").focus();
            } // document.querySelector("#username").select();
          });
      } else {
        window.location.assign(
          window.location.protocol + "//" + window.location.host
        );
      }
    });
  }

  submitTheProfile(choosedp) {
    // e.preventDefault();
    const { username, pwd } = this.state;
    const user = firebase.auth().currentUser;
    if (user) {
      this.setState({ isUploadingToFirebase: true });

      firebase
        .firestore()
        .collection("users")
        .doc(user.uid)
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
