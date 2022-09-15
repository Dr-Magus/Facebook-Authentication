import React from "react";
import axios from "axios";
import FacebookLogin from "react-facebook-login";

export default function Login() {
  const continueWithFacebook = (accesstoken) => {
    axios
      .post("http://127.0.0.1:8000/auth/convert-token", {
        token: accesstoken,
        backend: "facebook",
        grant_type: "convert_token",
        client_id: "JZtHQwXrWrSNsOtv5E6aGKsftD39jt8IJzBWFon4",
        client_secret:
          "y2XPOruPizS6aj6PMDi4SqhXWq1hMQXh0EB24tI5PzktL55dabVWKNFbV7OMhNKIt9Ifk1lMPrXrS3tQKRgQt3w33jjThMjaeUpJX5IOULTXiT26LU6wChgpXfubIHnA",
      })
      .then((res) => {
        // console.log(res);
        localStorage.setItem("access_token", res.data.access_token);
        localStorage.setItem("refresh_token", res.data.refresh_token);
        window.location.replace("/");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const responseFacebook = (res) => {
    console.log(res);
    continueWithFacebook(res.accessToken);
  };

  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <div className="w-full flex justify-center flex-col items-center space-y-2">
        <FacebookLogin
          appId="1151759985418839"
          fields="name, email, picture"
          icon="fa-facebook"
          callback={responseFacebook}
        />
      </div>
    </div>
  );
}
