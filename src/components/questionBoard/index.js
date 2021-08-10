import React, { Component } from "react";
import "./styles/style.css";
import questionso from "./question";
import QuestionWithOption from "./quesWithOption";
import QuestionWithoutOption from "./quesWithoutOption";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import person from "../profile/images/person.png";
import firebase from "../../firebase/firebase";
import "firebase/auth";
import "firebase/firestore";
import LoadingRender from "../loading/loading";
import uuid from "react-uuid";

class QuestionBoard extends Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      userAnswers:
        this.props.userAnswers ||
        Array(questionso[0].length + questionso[1].length).fill(-1),
      questions1: questionso[0],
      canShowShowButton: this.props.userAnswers ? true : false,
      questions2: questionso[1],
      totalQuestions: questionso[0].length + questionso[1].length,
      currentIndex: 0,
      langIndex: 0,
      optionIsSelected: false,
      selectedOptionIndex: -1,
      showLess: true,
      showAnswerClicked: false,
      nQuestionToShow: 3,
      canClickSubmit: true,
      canClickPrev: true,
      canClickNext: true,
      isUploadingToFirebase: false,
      isMounted: true,
    };
    this.optionSelected = this.optionSelected.bind(this);
    this.submitTheOption = this.submitTheOption.bind(this);
    this.showTheAnswers = this.showTheAnswers.bind(this);
    this.updateQuestion = this.updateQuestion.bind(this);
    this.decreaseOpacity = this.decreaseOpacity.bind(this);
    this.makeItGreen = this.makeItGreen.bind(this);
  }

  componentWillUnmount() {
    this.setState({ isMounted: false });
    this.setState = (state, callback) => {
      return;
    };
  }

  updateQuestion(upd) {
    let { currentIndex, totalQuestions } = this.state;

    if (currentIndex + upd > -1 && currentIndex + upd < totalQuestions) {
      currentIndex += upd;
      if (currentIndex - 1 <= 0) this.setState({ canClickPrev: false });
      if (currentIndex - 1 > -1) this.setState({ canClickPrev: true });
      if (currentIndex + 1 < totalQuestions)
        this.setState({ canClickNext: true });
      if (currentIndex + 1 >= totalQuestions)
        this.setState({ canClickNext: false });
      this.setState({ currentIndex });
      this.setState({ optionIsSelected: false });
      this.setState({ selectedOptionIndex: -1 });
      window.scrollTo(0, 120);
    }
  }

  optionSelected(index) {
    this.setState({ optionIsSelected: true });
    this.setState({ selectedOptionIndex: index });
  }

  submitTheOption(upd) {
    let {
      userAnswers,
      currentIndex,
      selectedOptionIndex,
      totalQuestions,
      optionIsSelected,
    } = this.state;

    if (userAnswers[currentIndex] !== -1 || optionIsSelected) {
      if (selectedOptionIndex !== -1) {
        userAnswers[currentIndex] = selectedOptionIndex;
        this.setState({ userAnswers });
      }
      if (totalQuestions - 1 === currentIndex) {
        this.showTheAnswers();
      } else {
        this.updateQuestion(upd);
      }
    } else {
      return;
    }
  }

  showTheAnswers() {
    if (this.state.showAnswerClicked) return;
    const user = firebase.auth().currentUser;
    let { userAnswers } = this.state;

    if (true) {
      this.setState({ isUploadingToFirebase: true });
    }
    if (user) {
      // true && this.setState({ isUploadingToFirebase: true });

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
            .update({ userAnswers })
            .then((d) => {
              if (true) {
                this.setState({ showAnswerClicked: false });
              }
              window.location.assign(window.location + "/showmyanswers");
            })
            .catch((err) => {
              console.log(err, "cant write database ");
            });
        });
    } else {
      firebase
        .auth()
        .signInAnonymously()
        .then((user) => {
          firebase
            .firestore()
            .collection("usersuid")
            .doc(user.user.uid)
            .set({ uid: user.user.uid });
          firebase
            .firestore()
            .collection("users")
            .doc(user.user.uid)
            .set({
              uid: user.user.uid,
              username: "guest" + uuid().slice(0, 3),
              pwd: String(Math.floor(Math.random(0.1, 1) * 10000)),
              userAnswers,
              creation: false,
              myFavourites: [],
              relativeToMe: 0,
              imageurl: person,
              followers: 0,
              following: 0,
              chatsWith: [],
            })
            .then((d) => {
              if (true) {
                this.setState({ showAnswerClicked: false });
                this.setState({ isUploadingToFirebase: false });
              }

              window.location.assign(window.location + "/showmyanswers");
            })
            .catch((err) => {
              console.log(err, "cant write database ");
            });
        })
        .catch((err) => {
          console.log("cannot sign in anonymously ", err);
        });
    }
  }

  decreaseOpacity(idx) {
    let { selectedOptionIndex, userAnswers, currentIndex } = this.state;

    if (selectedOptionIndex === -1) {
      return userAnswers[currentIndex] === idx ? "decreaseOpacity" : ""; //&&
      // userAnswers[currentIndex] === selectedOptionIndex;
    }

    if (selectedOptionIndex !== -1) {
      return selectedOptionIndex === idx ? "decreaseOpacity" : "";
    }

    if (userAnswers[currentIndex] !== -1) {
      return userAnswers[currentIndex] === selectedOptionIndex
        ? "decreaseOpacity"
        : "";
    }
  }

  makeItGreen(idx) {
    let { selectedOptionIndex, userAnswers, currentIndex } = this.state;

    if (selectedOptionIndex === -1) {
      return userAnswers[currentIndex] === idx
        ? "boolOptionSelected"
        : "boolOptionNotSelected"; //&&
      // userAnswers[currentIndex] === selectedOptionIndex;
    }

    if (selectedOptionIndex !== -1) {
      return selectedOptionIndex === idx
        ? "boolOptionSelected"
        : "boolOptionNotSelected";
    }

    if (userAnswers[currentIndex] !== -1) {
      return userAnswers[currentIndex] === selectedOptionIndex
        ? "boolOptionSelected"
        : "boolOptionNotSelected";
    }
  }

  render() {
    const {
      currentIndex,
      langIndex,
      optionIsSelected,
      userAnswers,
      questions1,
      questions2,
      totalQuestions,
    } = this.state;
    const canClickSubmit = optionIsSelected || userAnswers[currentIndex] !== -1;
    let submitBtnClass =
      optionIsSelected || userAnswers[currentIndex] !== -1
        ? "pairomeBtn"
        : "disabledBtn";

    let prevBtnClass = currentIndex > 0 ? "pairomeBtn" : "disabledBtn";
    let nextBtnClass =
      currentIndex < totalQuestions - 1 ? "pairomeBtn" : "disabledBtn";

    return (
      <div>
        {this.state.isUploadingToFirebase ? (
          <LoadingRender />
        ) : (
          <div className="containerD">
            <p className="headingo">
              {" "}
              we have some question to know your childhood memory
            </p>
            <div className="langButton">
              <div
                className="lbtn"
                onClick={() => {
                  this.setState({ langIndex: 0 });
                }}
              >
                English
              </div>
              <div
                className="lbtn"
                onClick={() => {
                  this.setState({ langIndex: 1 });
                }}
              >
                Hindi
              </div>
            </div>
            {currentIndex < questions1.length ? (
              <QuestionWithOption
                question={questions1[currentIndex]}
                langIndex={langIndex}
                optionSelected={this.optionSelected}
                decreaseOpacity={this.decreaseOpacity}
              />
            ) : (
              <QuestionWithoutOption
                question={questions2[currentIndex - questions1.length]}
                langIndex={langIndex}
                optionSelected={this.optionSelected}
                makeItGreen={this.makeItGreen}
              />
            )}
            <div className="center">
              <div className="row questionNavig">
                <div className="col s2 l2"></div>
                <div
                  className={"col s2 l2 " + prevBtnClass}
                  onClick={() => {
                    this.state.canClickPrev && this.updateQuestion(-1);
                    canClickSubmit && this.submitTheOption(-1);
                  }}
                >
                  Prev
                </div>
                <div className="col s1 l1"></div>
                <div
                  className={"col s3 l2 " + submitBtnClass}
                  onClick={(e) => {
                    canClickSubmit && this.submitTheOption(1);
                  }}
                >
                  Submit
                </div>
                <div className="col s1 l1"></div>
                <div
                  className={"col s2 l2 " + nextBtnClass}
                  onClick={(e) => {
                    this.state.canClickPrev && this.updateQuestion(1);
                    canClickSubmit && this.submitTheOption(1);
                  }}
                >
                  Next
                </div>
                <div className="col s3 l4"></div>
              </div>
            </div>
            <div
              // to="/questionBoard/showmyanswers"
              onClick={(e) => {
                (this.state.canShowShowButton || currentIndex > 3) &&
                  this.showTheAnswers();
                // window.scrollTo(0, 1000);
              }}
            >
              <div
                className={
                  "center " +
                  (this.state.canShowShowButton || currentIndex > 3
                    ? "center pairomeBtn "
                    : "center disabledBtn")
                }
              >
                Show My Answers
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(QuestionBoard);
