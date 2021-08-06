import React, { Component } from "react";
// import questions from "../questionBoard/question";
import questionso from "../questionBoard/question";
import { Link } from "react-router-dom";
import "./styles/style.css";
import firebase from "../../firebase/firebase";
import "firebase/auth";
import "firebase/firestore";
import LoadingRender from "../loading/loading";

class ShowMyAnswers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userAnswers: JSON.parse(localStorage.getItem("CurrentUserAnswers")),
      questions: questionso[0].concat(questionso[1]),
      langIndex: 0,
      isUploadingToFirebase: true,
    };
  }
  componentDidMount() {
    // let userAnswers = JSON.parse(localStorage.getItem("CurrentUserAnswers"));
    console.log(this.props.sendTo);
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        firebase
          .firestore()
          .collection("users")
          .doc(firebase.auth().currentUser.uid)
          .onSnapshot((doc) => {
            this.setState({ isUploadingToFirebase: false });

            this.setState({ userAnswers: doc.data().userAnswers });
          });
      } else {
        console.log("no user yet");
        window.location.assign(
          window.location.protocol + "//" + window.location.host
        );
      }
    });
  }
  render() {
    const { userAnswers, questions, langIndex } = this.state;
    return (
      <div>
        {this.state.isUploadingToFirebase ? (
          <LoadingRender />
        ) : (
          <div className="containerD">
            <p className="headingo">Here are your responses</p>
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

            {questions.map((question, idx) => (
              <div key={idx + 1} className="ques-ans">
                <p className="squestionStatement">
                  {idx + 1 + ". "}
                  {question.statement[langIndex]}
                </p>

                {userAnswers[idx] !== -1 ? (
                  <h6 className="answer green-text">
                    {question.options[userAnswers[idx]].name[langIndex]}
                  </h6>
                ) : (
                  <h6 className="answer black-text"> Not Answered</h6>
                )}
              </div>
            ))}
            <Link to={this.props.sendToEdit || "/questionBoard"}>
              <div className="bigBtns">Edit your Answers</div>
            </Link>
            <Link
              to={
                this.props.sendTo ||
                "/questionBoard/showmyanswers/createProfile"
              }
            >
              <div className="bigBtns">Proceed to Your Profile</div>
            </Link>
          </div>
        )}
      </div>
    );
  }
}

export default ShowMyAnswers;
