import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Modal,
  Button,
} from "@material-ui/core";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import EditIcon from "@material-ui/icons/Edit";
import { makeStyles } from "@material-ui/core/styles";
import "./Todo.css";
import { db } from "./firebase";
import { useStateValue } from "./StateProvider";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 300,
    height: 200,
    top: "50%",
    left: "50%",
    transform: "translate(-150px, -100px)",
    backgroundColor: "rgb(200,200,200)",
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(5, 3, 3),
    textAlign: "center",
  },
  item: {
    margin: theme.spacing(0.3),
  },
  save: {
    margin: theme.spacing(3, 0, 0.3, 0),
  },
}));

function Todo(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [{ user }, dispatch] = useStateValue();

  const handleClose = () => {
    setOpen(false);
  };

  const updateTodo = () => {
    db.collection("users")
      .doc(user?.uid)
      .collection("todos")
      .doc(props.todo.id)
      .set(
        {
          todo: input,
        },
        { merge: true }
      );
    setOpen(false);
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div className={classes.paper}>
          <TextField
            variant="outlined"
            fullWidth
            value={input ? input : props.todo.todo}
            onChange={(event) => setInput(event.target.value)}
          />
          <br />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={updateTodo}
            className={classes.save}
          >
            Speichern
          </Button>
        </div>
      </Modal>

      <List>
        <ListItem>
          <ListItemText primary={props.todo.todo} />
        </ListItem>
        <Button
          type=""
          variant="contained"
          color="primary"
          className={classes.item}
        >
          <EditIcon onClick={(e) => setOpen(true)} />
        </Button>
        <Button
          type=""
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          <DeleteForeverIcon
            onClick={(event) =>
              db
                .collection("users")
                .doc(user?.uid)
                .collection("todos")
                .doc(props.todo.id)
                .delete()
            }
          />
        </Button>
      </List>
    </>
  );
}

export default Todo;
