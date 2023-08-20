import React from "react";
import { Navigate } from "react-router-dom";

const SocialLogin = (props) => {
  const getUrlParameter = (name) => {
    // 쿼리 파라미터에서 값 추출
    let search = window.location.search;
    let params = new URLSearchParams(search);
    return params.get(name);
  };

  const token = getUrlParameter("token");
  // 토큰이라는 파라미터의 값을 추출함

  console.log("토큰 파싱 " + token);

  if (token) {
    // local Storage에 저장
    localStorage.setItem("ACCESS_TOKEN", token);
    return <Navigate to={{ pathname: "/", state: { from: props.location } }} />;
  } else{
    return <Navigate to={{ pathname: "/login", state: { from: props.location } }} />;
  }
};

export default SocialLogin;
