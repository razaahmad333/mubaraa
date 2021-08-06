import React, { useState } from "react";
import "./style/style.css";
import dp0 from "./images/person.png";
import dp1 from "./images/dp1.jpg";
import dp2 from "./images/dp2.jpg";
import dp3 from "./images/dp3.jpg";
// import dp4 from "./images/dp4.jpg";
import dp5 from "./images/dp5.jpg";
import dp6 from "./images/dp6.jpg";
import dp7 from "./images/dp7.jpg";
import dp8 from "./images/dp8.jpg";
import dp9 from "./images/dp9.jpg";
import dp10 from "./images/dp10.jpg";
import dp11 from "./images/dp13.jpeg";
import dp12 from "./images/dp11.jpg";

import firebase from "../../firebase/firebase";
import "firebase/auth";
import "firebase/storage";
import "firebase/firestore";
import LoadingRender from "../loading/loading";

function ChooseDp(props) {
  const [isUploadingToFirebase, setIsUploadingToFirebase] = useState(false);
  const dps = [dp0, dp1, dp2, dp3, dp5, dp6, dp7, dp8, dp9, dp10, dp11, dp12];
  const [selectedDpIndex, setSelectedDpIndex] = useState(
    props.me.imageurl ? dps.indexOf(props.me.imageurl) : 0
  );

  return (
    <>
      {!isUploadingToFirebase ? (
        <div className="containerD">
          <div>
            <p className="headingo">Chooose one of the option</p>
            <div className="row containerDp">
              {dps.map((dp, idx) => (
                <div key={idx} className="col s3 m4 l3 ">
                  <img
                    alt="dp's"
                    src={dp}
                    className={idx === selectedDpIndex ? "dps bordered" : "dps"}
                    onClick={(e) => {
                      e.preventDefault();
                      console.log(selectedDpIndex);
                      setSelectedDpIndex(idx);
                    }}
                  />
                </div>
              ))}
            </div>
            <div
              className="submitButton center"
              onClick={() => {
                !isUploadingToFirebase &&
                  firebase.auth().currentUser &&
                  firebase
                    .firestore()
                    .collection("users")
                    .doc(props.me.uid)
                    .update({
                      imageurl: dps[selectedDpIndex],
                      creation: true,
                    })
                    .then(() => {
                      console.log("docuemt written");
                      window.location.assign(
                        window.location.protocol +
                          "//" +
                          window.location.host +
                          (props.sendTo || "")
                      );
                    })
                    .catch((err) => {
                      throw err;
                    });
                setIsUploadingToFirebase(true);
              }}
            >
              {props.sendTo ? "Change Dp" : "Create Your Profile"}
            </div>
          </div>
        </div>
      ) : (
        <LoadingRender />
      )}{" "}
    </>
  );
}

export default ChooseDp;
