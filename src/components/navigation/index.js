//main branch

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

function Navigation(props) {
  const location = useLocation();
  const [isAuthenticated] = useState(props.isAuthenticated);
  const [dp] = useState(props.me.imageurl);

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
    M.Modal.init(modal, {
      onOpenEnd: () => {
        sidenavInstances[0].close();
      },
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
            <span className="brand"> Mubaraah</span>
          </Link>
        </div>

        <div className="col l1"></div>
        <div className="col l7">
          <div className="row">
            {isAuthenticated ? <div className="col l3"></div> : ""}
            <div className="col l3 ">
              <Link to="/aboutus">
                <div className="accountLinks">About Us</div>
              </Link>
            </div>
            <div className="col l1"></div>
            {isAuthenticated ? (
              <div className="col l2">
                <Link to="/privateProfile">
                  <img
                    alt="tasveer"
                    src={dp || dp1}
                    width={"50"}
                    height={"50"}
                    className="dp"
                  />
                </Link>
              </div>
            ) : (
              <div className="col l6">
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
            <div className="col l1">
              {isAuthenticated && (
                <a className="sidenav-trigger" href="#slide-out">
                  {" "}
                  <i className="material-icons small menuIcon">menu</i>
                </a>
              )}
            </div>
            <div className="col l2"></div>
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
            className="circle center dpInSidenav"
          />
          {/* </div>
          </div> */}
        </li>
        {isAuthenticated && dp ? (
          <li>
            <Link to="/" className="wave-effect">
              <div className="headingo">{props.me.username}</div>
            </Link>
          </li>
        ) : (
          ""
        )}

        <li>
          <Link to="/" className="wave-effect">
            Home
          </Link>
        </li>
        {isAuthenticated && dp ? (
          <li>
            <Link to="/privateProfile" className="waves-effect">
              My Profile
            </Link>
          </li>
        ) : (
          ""
        )}
        {isAuthenticated && dp ? (
          <li>
            <Link to="/privateProfile/messageBoard" className="waves-effect">
              Messages{" "}
              {props.msgCount === 0 ? (
                ""
              ) : (
                <span className="new badge red">{props.msgCount}</span>
              )}
            </Link>
          </li>
        ) : (
          ""
        )}
        {isAuthenticated && dp ? (
          <li>
            <Link
              to="/privateProfile/questionBoard/showmyanswers"
              className="waves-effect"
            >
              My Responses
            </Link>
          </li>
        ) : (
          ""
        )}
        {isAuthenticated && dp ? (
          <li>
            <Link to="/privateProfile/createProfile" className="waves-effect">
              Edit My Profile
            </Link>
          </li>
        ) : (
          ""
        )}

        <li>
          <div className="divider"></div>
        </li>
        <li>
          <a href="#modal1" className="waves-effect modal-trigger">
            {isAuthenticated ? "Login to other account" : "Login"}
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
          <Link to="/aboutus" className="waves-effect">
            About Us
          </Link>
        </li>
      </ul>
      {/* added this thing to main move it to added to login please  */}
      <div id="signOutMessage" className="modal modalInNav">
        <div className="modal-content">
          <p className="headingo">Are You sure to sign out</p>
          <div className="btnContains">
            <div
              className="privateBtn"
              onClick={(e) => {
                isAuthenticated && e.preventDefault();
                loginCreate(isAuthenticated, "/loginPage");
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
