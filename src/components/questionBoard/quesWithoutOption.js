import React, { Component } from "react";
import "./styles/style.css";
class QuestionWithoutOption extends Component {
  render() {
    const { question, langIndex } = this.props;
    return (
      <div>
        <p className="questionStatement">{question.statement[langIndex]}</p>
        <div className="row center">
          <div className="col s3 l3"></div>
          <div
            className={"col s2 l1 " + this.props.makeItGreen(0)}
            onClick={() => {
              this.props.optionSelected(0);
            }}
          >
            {question.options[0].name[langIndex]}
          </div>
          <div className="col s3 l4"></div>
          <div
            onClick={() => {
              this.props.optionSelected(1);
            }}
            className={"col s2 l1 " + this.props.makeItGreen(1)}
          >
            {question.options[1].name[langIndex]}
          </div>
          <div className="col s2 l3"></div>
        </div>
        <div className="center">
          <img alt="tasveer" src={question.img} width={"200"} height={"200"} />
        </div>
      </div>
    );
  }
}

export default QuestionWithoutOption;
