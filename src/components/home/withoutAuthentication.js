import React from "react";
import { Link } from "react-router-dom";
import "./styles/style.css";
import bg from "./bg1.jpg";
// import firebase from "../../firebase/firebase";
// import "firebase/auth";
function HomeWithoutAuthentication() {
  return (
    <div className="containerD">
      <div className=" center" id="welcome">
        Welcomes, you to new Era
      </div>
      <img src={bg} alt="tasveer" className="bgi" />
      <div className=" center" id="time">
        Now, its time to get friends by your childhood memories
      </div>
      <div>
        <Link
          to={{
            pathname: "/questionBoard",
            state: { editIt: false },
          }}
        >
          <div className="getStarted">Get Started</div>
        </Link>{" "}
      </div>
    </div>
  );
}

export default HomeWithoutAuthentication;
