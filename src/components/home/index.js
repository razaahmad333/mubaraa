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
          <HomeOnAuthentication me={this.props.me} />
        ) : (
          <HomeWithoutAuthentication />
        )}
      </div>
    );
  }
}

export default Home;
