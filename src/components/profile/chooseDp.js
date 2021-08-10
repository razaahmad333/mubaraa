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
import dp12 from "./images/dp12.jpg";
import dp13 from "./images/dp33.jpg";
import dp14 from "./images/dp14.jpg";
import dp15 from "./images/dp15.jpg";
import dp16 from "./images/dp16.jpg";
import dp17 from "./images/dp17.jpg";
import dp18 from "./images/dp18.jpg";
import dp19 from "./images/dp19.jpg";
import dp20 from "./images/dp20.jpg";
import dp21 from "./images/dp21.jpg";
import dp22 from "./images/dp22.jpg";
import dp23 from "./images/dp23.jpg";
import dp24 from "./images/dp24.jpg";
import dp25 from "./images/dp25.jpg";
import dp26 from "./images/dp26.jpg";
import dp27 from "./images/dp27.jpg";
import dp28 from "./images/dp28.jpg";
import dp29 from "./images/dp29.jpg";
import dp30 from "./images/dp30.jpg";
import dp31 from "./images/dp31.jpg";
import dp32 from "./images/dp32.jpg";
import dp33 from "./images/dp11.jpg";

import firebase from "../../firebase/firebase";
import "firebase/auth";
import "firebase/storage";
import "firebase/firestore";
import LoadingRender from "../loading/loading";

function ChooseDp(props) {
  const [isUploadingToFirebase, setIsUploadingToFirebase] = useState(false);
  const dps = [
    dp0,
    dp1,
    dp2,
    dp3,
    dp5,
    dp6,
    dp7,
    dp8,
    dp9,
    dp10,
    dp11,
    dp12,
    dp13,
    dp14,
    dp15,
    dp16,
    dp17,
    dp18,
    dp19,
    dp20,
    dp21,
    dp22,
    dp23,
    dp24,
    dp25,
    dp26,
    dp27,
    dp28,
    dp29,
    dp30,
    dp31,
    dp32,
    dp33,
  ];
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
