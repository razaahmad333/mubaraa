import React from "react";
import "./App.css";

import firebase from "./firebase/firebase";

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(firebase);
    return (
      <div>
        <h1>This is woohoo created new things </h1>
        <h1>Ahmad raza kahn</h1>
        <h1>Israr khan kahn</h1>
      </div>
    );
  }
}
export default App;
