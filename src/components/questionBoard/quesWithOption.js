import React, { Component } from "react";
// import ReactDOM from "react-dom";
import "./styles/style.css";
class QuestionWithOption extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nOptionToShow: 4,
      showLess: true,
    };
  }
  render() {
    const { question, langIndex } = this.props;
    const { nOptionToShow, showLess } = this.state;
    return (
      <div>
        <p className="questionStatement">{question.statement[langIndex]}</p>

        <div className="row">
          {question.options.map((option, index) =>
            index < nOptionToShow || (!showLess && index >= nOptionToShow) ? (
              <div key={index} className="col s6 m6 l3 xl3 center">
                <div
                  className="row option "
                  onClick={() => {
                    this.props.optionSelected(index);
                  }}
                >
                  <div className="col s12 optionImage center">
                    <img
                      alt="tasveer"
                      src={option.img}
                      className={this.props.decreaseOpacity(index)}
                      width={"150"}
                      height={"150"}
                    />
                  </div>{" "}
                  <div className="col s12">
                    <span className="optionName">{option.name[langIndex]}</span>
                  </div>{" "}
                </div>
              </div>
            ) : (
              ""
            )
          )}
        </div>
        {question.options.length > nOptionToShow ? (
          showLess ? (
            <div
              className="expandBtn center"
              onClick={(e) => {
                this.setState({ showLess: false });
                window.scrollTo(0, 400);
                // ReactDOM.findDOMNode(e.target).scrollIntoView();
              }}
            >
              Show More
            </div>
          ) : (
            <div
              className="expandBtn center"
              onClick={(e) => {
                this.setState({ showLess: true });
                window.scrollTo(0, 120);
                // ReactDOM.findDOMNode(e.target).scrollIntoView();
              }}
            >
              Show Less
            </div>
          )
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default QuestionWithOption;
