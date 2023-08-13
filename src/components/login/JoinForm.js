import { Container, Grid, Typography, TextField, Button } from "@mui/material";
import { Form, json, redirect, Link } from "react-router-dom";


function JoinForm({ method }) {

  return (
    <Container component="main" maxWidth="xs" style={{ marginTop: "8%" }}>
      <Form method={method} >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography component="h1" variant="h5">
              계정 생성
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              autoComplete="fname"
              name="name"
              variant="outlined"
              required
              fullWidth
              id="name"
              label="유저 이름"
              autoFocus
            />
          </Grid>
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
              계정 생성
            </Button>
          </Grid>
        </Grid>
        <Grid container justify="flex-end">
          <Grid item>
              <Link to="/login">이미 계정이 있습니까? 로그인 하세요.</Link>
          </Grid>
        </Grid>
      </Form>
    </Container>
  );
}

export default JoinForm;

export async function action({ request, params }) {
  const method = request.method;
  const data = await request.formData();

  const signinData = {
    name: data.get("name"),
    email: data.get("email"),
    password: data.get("password"),
  };

  let url = "http://localhost:8080/auth/signup";

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

  if(response.ok){
    alert("Join Success");
    return redirect("/login") ;
  }

  if (response.state === 422) {
    return response;
  }

  if (!response.ok) {
    throw json({ message: "Could not save board." }, { status: 500 });
  }
}
