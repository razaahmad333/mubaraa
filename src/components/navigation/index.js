import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./styles/style.css";
import M from "materialize-css";
import dp1 from "./person.png";
// import dp1 from "../profile/images/dp1.jpg";
import firebase from "../../firebase/firebase";
import "firebase/auth";
import "firebase/firestore";
function givePath(locationa) {
  let pathName = locationa.pathname.split("/");
  pathName.pop();
  return pathName.join("/") === "" ? "/" : pathName.join("/");
}

function Navigation() {
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(
    firebase.auth().currentUser
  );
  const [dp, setDp] = useState(false);
  const [isUploadingToFirebase, setIsUploadingToFirebase] = useState(true);
  const doThis = (athe, dpo) => {
    setIsAuthenticated(athe);
    setDp(dpo);
  };

  const loginCreate = (ifauth, sendTo) => {
    ifauth
      ? firebase
          .auth()
          .signOut()
          .then(() => {
            window.location.assign(
              window.location.protocol + "//" + window.location.host + sendTo
            );
          })
      : window.location.assign(
          window.location.protocol + "//" + window.location.host + sendTo
        );
  };
  useEffect(() => {
    var sidenav = document.querySelectorAll(".sidenav");
    var sidenavInstances = M.Sidenav.init(sidenav, {
      draggable: true,
      edge: "right",
    });

    var modal = document.querySelectorAll(".modal");
    var modalInstances = M.Modal.init(modal, {
      onOpenEnd: () => {
        console.log(sidenavInstances[0].close());
      },
    });

    firebase.auth().currentUser &&
      firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .onSnapshot((doc) => {
          doThis(true, doc.data().imageurl);
          setIsUploadingToFirebase(false);
        });

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        firebase
          .firestore()
          .collection("users")
          .doc(user.uid)
          .onSnapshot((doc) => {
            doThis(true, doc.data().imageurl);
            setIsUploadingToFirebase(false);
          });
      } else {
        setIsAuthenticated(false);
      }
    });
  });
  return (
    <div className="containerD">
      <div className="row hide-on-large-only" id="topNav">
        <div className="col s2">
          <Link to={givePath(location)}>
            <i className="material-icons small arrowIcon">arrow_back</i>
          </Link>
        </div>
        <div className="col s8">
          <Link to="/">
            <span className="brand"> Mubaraah</span>
          </Link>
        </div>

        <div>
          <div className=" col s2">
            <a className="sidenav-trigger" href="#slide-out">
              {" "}
              <i className="material-icons small menuIcon">menu</i>
            </a>
          </div>
        </div>
      </div>
      <div className="row  hide-on-small-only hide-on-med-only">
        <div className="col l1">
          <Link to={givePath(location)}>
            <i className="material-icons small arrowIcon">arrow_back</i>
          </Link>
        </div>
        <div className="col l3">
          <Link to="/">
            <span className="brand"> Mubaraa</span>
          </Link>
        </div>

        <div className="col l1"></div>
        <div className="col l7">
          <div className="row">
            {isAuthenticated ? <div className="col l4"></div> : ""}
            <div className="col l3 ">
              <div className="accountLinks">About Us</div>
            </div>
            <div className="col l1"></div>
            {isAuthenticated ? (
              <div className="col l4">
                <img
                  alt="tasveer"
                  src={dp || dp1}
                  width={"50"}
                  height={"50"}
                  className="dp"
                  onClick={() => {
                    const boolo = !isUploadingToFirebase && dp;
                    console.log(boolo, dp);
                    boolo &&
                      window.location.assign(
                        window.location.protocol +
                          "//" +
                          window.location.host +
                          "/privateProfile"
                      );
                  }}
                />
              </div>
            ) : (
              <div className="col l8">
                <div className="row">
                  <div className="col l5 ">
                    {" "}
                    <div
                      className="accountLinks modal-trigger"
                      data-target="modal1"
                    >
                      Login
                    </div>
                  </div>
                  <div className="col l2"></div>
                  <div className="col l5 ">
                    {" "}
                    <div
                      className="accountLinks modal-trigger"
                      data-target="modal1"
                    >
                      Sign Up
                    </div>
                  </div>{" "}
                </div>{" "}
              </div>
            )}
          </div>
        </div>
      </div>
      <ul id="slide-out" className="sidenav">
        <li>
          {/* <div className="user-view">
            <div className="background"> */}
          <img
            alt="tasveer"
            src={dp || dp1}
            width="100px"
            height="100px"
            className="circle center"
          />
          {/* </div>
          </div> */}
        </li>
        <li>
          <a href="/" className="waves-effect">
            Home
          </a>
        </li>
        {isAuthenticated && dp ? (
          <li>
            <a href="/privateProfile" className="waves-effect">
              My Profile
            </a>
          </li>
        ) : (
          ""
        )}
        {isAuthenticated && dp ? (
          <li>
            <a
              href="/privateProfile/questionBoard/showmyanswers"
              className="waves-effect"
            >
              My Responses
            </a>
          </li>
        ) : (
          ""
        )}
        {isAuthenticated && dp ? (
          <li>
            <a href="/privateProfile/createProfile" className="waves-effect">
              Edit My Profile
            </a>
          </li>
        ) : (
          ""
        )}

        <li>
          <div className="divider"></div>
        </li>
        <li>
          <a href="#modal1" className="waves-effect modal-trigger">
            Login{" "}
          </a>
        </li>
        <li>
          <a href="#modal1" className="waves-effect modal-trigger">
            Create New Account
          </a>
        </li>
        <li>
          <a href="#signOutMessage" className="waves-effect modal-trigger">
            Sign Out
          </a>
        </li>

        <li>
          <div className="divider"></div>
        </li>
        <li>
          <a className="waves-effect" href="/">
            About Us
          </a>
        </li>
      </ul>

      <div id="signOutMessage" className="modal modalInNav">
        <div className="modal-content">
          <p className="headingo">Are You sure to sign out</p>
          <div className="btnContains">
            <div
              className="privateBtn"
              onClick={(e) => {
                isAuthenticated && e.preventDefault();
                loginCreate(isAuthenticated, "");
              }}
            >
              {" "}
              Yeah, Sure
            </div>
          </div>
        </div>
      </div>
      <div id="modal1" className="modal modalInNav">
        <div className="modal-content">
          <div className="row modalBtnContainer">
            <div className="col s12">
              <div className="center message">
                if you want to login to existing account
              </div>
            </div>
            <div className="col s12">
              <div
                className="modalBtn"
                onClick={() => {
                  loginCreate(isAuthenticated, "/loginPage");
                }}
              >
                Already Have An Account
              </div>
            </div>
            <div className="col s12">
              <hr></hr>
            </div>{" "}
            <div className="col s12">
              <div className="center message">
                {isAuthenticated
                  ? "you will be logged out from existing account"
                  : "create a new account by answering some questions"}
              </div>
            </div>
            <div className="col s12">
              <div
                className="modalBtn"
                onClick={() => {
                  loginCreate(isAuthenticated, "/questionBoard");
                }}
              >
                {" "}
                Yes <br></br> Create New Account
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navigation;
{
  /* 
{isAuthenticated ? (
  <div className="col s4">
    <img
      alt="tasveer"
      src={dp || dp1}
      width={"50"}
      height={"50"}
      className="dp"
      onClick={() => {
        const boolo = !isUploadingToFirebase && dp;
        console.log(boolo, dp);
        boolo &&
          window.location.assign(
            window.location.protocol +
              "//" +
              window.location.host +
              "/privateProfile"
          );
      }}
    />
  </div>
) : ( */
}
