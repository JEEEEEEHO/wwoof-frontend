import React from "react";
//import { signin } from "./service/ApiService";
import { Container, Grid, Typography, TextField, Button } from "@mui/material";
import { Form, json, redirect, Link } from "react-router-dom";

const ACCESS_TOKEN = "ACCESS_TOKEN";

function LoginForm({ method }) {

  return (
    <Container component="main" maxWidth="xs" style={{ marginTop: "8%" }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography component="h1" variant="h5">
            로그인
          </Typography>
        </Grid>
      </Grid>
      <Form method={method}>
        {" "}
        {/* submit 버튼을 누르면 handleSubmit이 실행됨. */}
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="email"
              label="이메일 주소"
              name="email"
              autoComplete="email"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="password"
              label="패스워드"
              type="password"
              id="password"
              autoComplete="current-password"
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" fullWidth variant="contained" color="primary">
              로그인
            </Button>
          </Grid>
          <Grid item>
            <Link to="/join">계정이 없습니까? 여기서 가입 하세요.</Link>
          </Grid>
        </Grid>
      </Form>
    </Container>
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
