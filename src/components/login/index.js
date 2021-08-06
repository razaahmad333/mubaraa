import React from "react";
// on
function LoginPage() {
  return (
    <div>
      <p className="headingo center">Login System Not added yet</p>
      <div className="btnContains">
        <div className="btnContains">
          <div
            className="privateBtn"
            onClick={() => {
              window.location.assign(
                window.location.protocol + "//" + window.location.host
              );
            }}
          >
            Go Back To Home
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
