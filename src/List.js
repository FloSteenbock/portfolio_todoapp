import React, { useState, useEffect } from "react";
import Todo from "./Todo";
import { db } from "./firebase";
import { useStateValue } from "./StateProvider";
import "./List.css";

function List() {
  const [todos, setTodos] = useState([]);
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    db.collection("users")
      .doc(user?.uid)
      .collection("todos")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setTodos(
          snapshot.docs.map((doc) => ({ id: doc.id, todo: doc.data().todo }))
        );
      });
  }, []);

  useEffect(() => {
    db.collection("users")
      .doc(user?.uid)
      .collection("todos")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setTodos(
          snapshot.docs.map((doc) => ({ id: doc.id, todo: doc.data().todo }))
        );
      });
  }, [user]);

  {
    if (user) {
      return (
        <div>
          <ul>
            {todos.map((todo) => (
              <Todo todo={todo} />
            ))}
          </ul>
        </div>
      );
    } else {
      return <h1>nicht eingelogged</h1>;
    }
  }
}

export default List;
