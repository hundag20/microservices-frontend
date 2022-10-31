import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import axios from "axios";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../store/auth";
import { uiActions } from "../store/ui";
import Notify from "./ui/Notify";
import SpinLoader from "./ui/SpinLoader";
import { Navigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { sbActions } from "../store/sidebar";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="#">
        ZKT 5.0 client
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();
let notFirstTime = false;
let data = {};

const unameIsValid = async (uname) => {
  if (!uname) return false;
  const valid = await /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
    String(uname).toLowerCase()
  );
  return valid;
};

const Login = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["token", "role"]);
  const dispatch = useDispatch();
  const errType = useSelector((state) => state.ui.notif.type);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const userData = useSelector((state) => state.auth.userData);
  const token = useSelector((state) => state.auth.accessToken);
  const isPending = useSelector((state) => state.ui.isLoading);

  console.log("isPending", isPending);
  console.log("role is: ", userData.role);
  console.log("token is: ", token);
  console.log("token name is: ", cookies.token);
  const handleSubmit = async (event) => {
    notFirstTime = true;
    event.preventDefault();
    data = new FormData(event.currentTarget);
    data = {
      username: data.get("username"),
      password: data.get("password"),
    };
    data.role = data.username.length === 5 ? "officer" : "driver";
    console.log("ispending: ", isPending);
    //on submit validation
    if (!(await unameIsValid(data.username))) {
      dispatch(uiActions.notif({ type: "danger", msg: "invalid username" }));
    } else if (data.password.length != 8 || data.password.includes("*")) {
      dispatch(uiActions.notif({ type: "danger", msg: "invalid password" }));
    } else {
      dispatch(uiActions.notif({ type: "", msg: "" }));
      dispatch(uiActions.startLoad());
    }
  };

  useEffect(() => {
    if (notFirstTime && isPending) {
      axios
        .get(
          `http://172.20.117.47:3001/v1/login?username=${data.username}&password=${data.password}`
        )
        .then(function (response) {
          // handle success
          dispatch(uiActions.stopLoad());
          dispatch(
            authActions.login({
              userData: response.data.userData,
              accessToken: response.data.accessToken,
            })
          );
          setCookie("token", response.data.accessToken);
          setCookie("role", response.data.userData.role);
          if(response.data.userData.role === 'finance') dispatch(sbActions.switch({ option: "fa_dashboard" }));
          else dispatch(sbActions.switch({ option: "dashboard" }));
    
        })
        .catch(function (error) {
          dispatch(uiActions.stopLoad());

          // handle error
          if (error?.response?.data && error?.response?.data?.error) {
            dispatch(authActions.logout());

            dispatch(
              uiActions.notif({
                type: "danger",
                msg: error.response.data.error,
              })
            );
          } else {
            console.log(error);
            dispatch(authActions.logout());
            dispatch(
              uiActions.notif({
                type: "danger",
                msg: "check your internet connection",
              })
            );
          }
        });
    }
  }, [isLoggedIn, isPending, dispatch]);

  return (
    <ThemeProvider theme={theme}>
      {token && userData.role != "finance" && <Navigate to="/home" replace />}
      {token && userData.role === "finance" && (
        <Navigate to="/fa_home" replace />
      )}
      <Container
        component="main"
        maxWidth="xs"
        style={{ bacgroundColor: "black" }}
      >
        {errType && <Notify />}
        <CssBaseline />
        {isPending && <SpinLoader />}
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="username"
              name="username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
};

export default { Login, unameIsValid };
