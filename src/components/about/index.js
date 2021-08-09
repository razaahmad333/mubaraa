import React, { Component } from "react";
import profile from "./images/profile.png";
import me from "./images/img.jpg";
import github from "./images/github.png";
// import facebook from "./images/facebook.png";
import gmail from "./images/gmail.png";
import instagram from "./images/instagram.png";
import twitter from "./images/twitter.png";
import a from "./images/a.png";
import youtube from "./images/youtube.png";
import "./styles/style.css";
class AboutUs extends Component {
  render() {
    return (
      <div className="containerD aboutus">
        <h4 className="headingo">Mubaraah</h4>
        <p>
          Intention of this app is to collect people having same childhood life
          , choices
        </p>
        <hr></hr>
        <h5 className="headingo">
          How To Use And Query Regarding to creating Profile{" "}
        </h5>
        <img src={profile} alt="test profile" />
        <p>you can send messages to anyone by clicking on its dp </p>
        <p> %tage tells how much you and next person are same </p>
        <p> Click on heart to add the user to your favourites</p>
        <p>new message shows next person have messaged you</p>
        <p>
          {" "}
          Select the option then click on submit to save the answer and then
          click on show answers
        </p>
        <hr></hr>
        <h5>Creator / Owner </h5>
        <img src={me} alt="me" className="circle" width="100px" />
        <p className="headingo">AHMAD RAZA</p>
        <p>Web developer</p>
        <p>INDIAN</p>
        <div className="row">
          <div className="col s2">
            <a href="https://github.com/razaahmad333">
              <img src={github} alt="github" width="30px" />
            </a>
          </div>
          <div className="col s2">
            <a href="https://instagram.com/ahmadrazakhan946">
              <img src={instagram} alt="instagram" width="30px" />
            </a>
          </div>

          <div className="col s2">
            <a href="https://twitter.com/@AHMADRa01256865">
              <img src={twitter} alt="twitter" width="30px" />
            </a>
          </div>
          <div className="col s2">
            <a href="mailto:raza82504@gmail.com">
              <img src={gmail} alt="gmail" width="30px" />
            </a>
          </div>
          <div className="col s2 ">
            <a href="https://compassionate-mccarthy-aacaae.netlify.app/index.html">
              <img src={a} alt="a" width="30px" />
            </a>
          </div>
          <div className="col s2">
            <a href="https://youtube.com/channel/UCpmgRgwzNyrj0lmfWB3PLFQ">
              <img src={youtube} alt="youtube" width="30px" />
            </a>
          </div>
        </div>
        <hr></hr>
        <h5 className="headingo">Technologies Used In This App</h5>
        <p>
          React.js by <b>Facebook</b>, a powerful javascript frontend framework
        </p>
        <p>
          {" "}
          Firebase by <b>Google</b>, provides an easy way to handle with
          authentication and database
        </p>

        <p>Materialize css, a little bit for position element </p>
        <p>
          VSCODE by <b>Microsoft</b>, awesome code editor
        </p>
        <hr></hr>
        <p className="center ">Created by AHMAD RAZA. © 2021</p>
      </div>
    );
  }
}

export default AboutUs;
