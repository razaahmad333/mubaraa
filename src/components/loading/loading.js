import React from "react";
import "./style.css";

function LoadingRender() {
  return (
    <div className="currentlyUploading">
      {" "}
      <p> please wait.....</p>{" "}
      <div className="preloader-wrapper big active">
        <div className="spinner-layer spinner-black-only">
          <div className="circle-clipper left">
            <div className="circle"></div>
          </div>
          <div className="gap-patch">
            <div className="circle"></div>
          </div>
          <div className="circle-clipper right">
            <div className="circle"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoadingRender;
