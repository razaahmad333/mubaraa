import React, { Component } from "react";
import questionso from "../questionBoard/question";
import { Link } from "react-router-dom";
import "./styles/style.css";

class ShowMyAnswers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userAnswers: this.props.userAnswers,
      questions: questionso[0].concat(questionso[1]),
      langIndex: 0,
    };
  }
  render() {
    const { userAnswers, questions, langIndex } = this.state;
    return (
      <div>
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
              this.props.sendTo || "/questionBoard/showmyanswers/createProfile"
            }
          >
            <div className="bigBtns">Proceed to Your Profile</div>
          </Link>
        </div>
      </div>
    );
  }
}

export default ShowMyAnswers;
