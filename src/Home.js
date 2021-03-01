import React, { useState, useEffect } from "react";
import { Button, FormControl, Input, InputLabel } from "@material-ui/core";
import { db, auth } from "./firebase";
import firebase from "firebase";
import "./Home.css";
import { useStateValue } from "./StateProvider";
import { Link } from "react-router-dom";
import List from "./List";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import ListAltOutlinedIcon from "@material-ui/icons/ListAltOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function Home() {
  const classes = useStyles();

  const [input, setInput] = useState("");
  const [{ user }, dispatch] = useStateValue();
  console.log(user);

  const handleAuthentication = () => {
    if (user) {
      auth.signOut();
    }
  };

  const addTodo = (event) => {
    event.preventDefault();
    db.collection("users").doc(user?.uid).collection("todos").add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setInput("");
  };

  return (
    <div className="App">
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <ListAltOutlinedIcon />
          </Avatar>
          {user ? (
            <Typography component="h1" variant="h4">
              Aufgabenliste von {user?.displayName}
            </Typography>
          ) : (
            <Typography component="h1" variant="h3">
              Aufgabenliste
            </Typography>
          )}

          <Button
            type=""
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            <Link to={!user && "/login"}>
              <div onClick={handleAuthentication}>
                <span>{user ? "Logout" : "Sign in"}</span>
              </div>
            </Link>
          </Button>

          {user ? (
            <>
              <form className={classes.form} noValidate>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      variant="outlined"
                      fullWidth
                      placeholder="neue Aufgabe"
                      value={input}
                      onChange={(event) => setInput(event.target.value)}
                    />
                  </Grid>
                </Grid>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={addTodo}
                  disabled={!input}
                >
                  Aufgabe hinzufügen
                </Button>
              </form>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12}>
                  <List />
                </Grid>
              </Grid>
            </>
          ) : (
            <Typography component="h1" variant="h5">
              Hier können Sie Ihre persönliche Aufgabenliste anlegen.
            </Typography>
          )}
        </div>
      </Container>
    </div>
  );
}

export default Home;
