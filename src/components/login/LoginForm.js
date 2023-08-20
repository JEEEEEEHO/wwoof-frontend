import React from "react";
//import { signin } from "./service/ApiService";
import { Container, Grid, Typography, TextField, Button } from "@mui/material";
import { Form, json, redirect, Link } from "react-router-dom";
import "./LoginForm.module.css";
import { GOOGLE_AUTH_URL, KAKAO_AUTH_URL } from "./index";
import googleLogo from "../../img/google-logo.png";
import kakaoLogo from "../../img/kakao-logo.png";

const ACCESS_TOKEN = "ACCESS_TOKEN";

function LoginForm({ method }) {
  return (
    <div className="login-container">
      <div className="login-content">
        <Form method={method}>
          <div className="form-item">
            <input
              type="email"
              name="email"
              id="email"
              className="form-control"
              placeholder="Email"
              required
            />
          </div>
          <div className="form-item">
            <input
              type="password"
              name="password"
              id="password"
              className="form-control"
              placeholder="Password"
              required
            />
          </div>
          <div className="form-item">
            <button type="submit" className="btn btn-block btn-primary">
              Login
            </button>
          </div>
        </Form>
        <span className="signup-link">
          <Link to="/join">계정이 없습니까? 여기서 가입 하세요.</Link>
        </span>
        <div className="social-login">
          <a className="btn btn-block social-btn google" href={GOOGLE_AUTH_URL}>
            <img src={googleLogo} alt="Google" /> Log in with Google
          </a>
          <a className="btn btn-block social-btn kakao" href={KAKAO_AUTH_URL}>
            <img src={kakaoLogo} alt="Kakao" /> Log in with Kakao
          </a>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;

export async function action({ request, params }) {
  const method = request.method;
  const data = await request.formData();

  const signinData = {
    email: data.get("email"),
    password: data.get("password"),
  };

  let url = "http://localhost:8080/auth/signin";

  let headers = new Headers({
    "Content-Type": "application/json",
  });

  const accessToken = localStorage.getItem("ACCESS_TOKEN");
  if (accessToken && accessToken !== null) {
    headers.append("Authorization", "Bearer " + accessToken);
  }

  const response = await fetch(url, {
    method: method,
    headers: headers,
    body: JSON.stringify(signinData),
  });

  const resData = await response.json();
  if (resData.token) {
    localStorage.setItem(ACCESS_TOKEN, resData.token);
    alert("Login Success");
    return redirect("/");
  }

  if (response.state === 422) {
    return response;
  }

  if (!response.ok) {
    throw json({ message: "Could not save board." }, { status: 500 });
  }
}
