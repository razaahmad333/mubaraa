import { Component, React } from "react";
import "./style/style.css";

import firebase from "../../firebase/firebase";
import "firebase/auth";
import "firebase/firestore";
import LoadingRender from "../loading/loading";
import abusiveFilter from "./abusiveFilter";
import M from "materialize-css";
class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showpwd: !false,
      next: false,
      message: "",
      username: this.props.me.username,
      instructionShow: true,
      pwd: this.props.me.pwd,
      isUploadingToFirebase: true,
      isMounted: true,
      allUsernames: [],
      instaces: undefined,
    };

    this.submitTheProfile = this.submitTheProfile.bind(this);
  }

  componentDidMount() {
    document.querySelector("#username") &&
      document.querySelector("#username").focus();
    // const modal = document.querySelector(".modal");
    // modal && M.Modal.init(modal, {});

    // this.setState({instaces});
    firebase
      .firestore()
      .collection("users")
      .get()
      .then((doc) => {
        const allUsernames = doc.docs.map((doco) =>
          doco.data().username.toLowerCase()
        );
        if (this.state.isMounted) {
          const modal = document.querySelector("#takess");
          const instaces = M.Modal.init(modal, {});
          this.setState({ instaces });
        }
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
    if (
      allUsernames.includes(username.toLowerCase()) &&
      username.toLowerCase() !== this.props.me.username.toLowerCase()
    ) {
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
    this.setState = (state, callback) => {
      return;
    };
  }

  render() {
    // const modal = document.querySelector(".modal");
    // const instaces = M.Modal.init(modal, {});
    // this.setState({instaces});
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
                  data-target="takess"
                  // className={
                  //   this.state.instructionShow
                  //     ? "submitButton center modal-trigger"
                  //     : "submitButton center "
                  // }
                  className={"submitButton center modal-trigger"}
                  onClick={() => {
                    if (!this.state.instructionShow) {
                      this.submitTheProfile(true);
                      this.setState({ next: !true });
                    }
                  }}
                >
                  {this.props.sendTo ? "Change Dp" : "Choose Dp"}
                </div>
                {this.props.sendTo && (
                  <div
                    data-target="takess"
                    className={"submitButton center modal-trigger"}
                    onClick={() => {
                      if (!this.state.instructionShow) {
                        this.submitTheProfile(false);
                        this.setState({ next: !true });
                      }
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
        <div className="modal" id="takess">
          <p className="center text-black">
            Take a screenShot of password so that you dont forget it{" "}
          </p>
          <p className="center text-black">
            in case you signed out accidently then you will no longer be able to
            recover your account{" "}
          </p>
          <p className="center">
            <i>Just for the shake of caution</i>
          </p>
          <p className="center">Not mandatory</p>

          <div className="btnContains">
            <div
              className="privateBtn modal-close"
              onClick={() => {
                this.state.instaces.destroy();
                this.setState({ instructionShow: false });
              }}
            >
              Okay{" "}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateProfile;
