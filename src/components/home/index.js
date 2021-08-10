import React, { Component } from "react";
import "./styles/style.css";
import "firebase/auth";
import "firebase/firestore";

import HomeOnAuthentication from "./onAuthentication";
import HomeWithoutAuthentication from "./withoutAuthentication";
class Home extends Component {
  render() {
    return (
      <div>
        {this.props.isAuthenticated ? (
          <HomeOnAuthentication
            me={this.props.me}
            msgCount={this.props.msgCount}
            currentlyChattingWith={this.props.currentlyChattingWith}
          />
        ) : (
          <HomeWithoutAuthentication />
        )}
        {/* <button onclick="window.open('https://web.whatsapp.com://send?text=This is whatsapp sharing example using button')"> Open WhatsApp </button>   */}
        <div className="containerD center">
          <div
            className="whatsappSharingBtn"
            onClick={() => {
              window.open(
                `whatsapp://send?text=Try Out this app ${
                  window.location.protocol + "//" + window.location.host
                }`
              );
            }}
          >
            {" "}
            Share with your friends
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
