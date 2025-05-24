import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import { db, auth, google } from "../firebase.ts";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { signInWithPopup, signOut } from "firebase/auth";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [docRef, setDocRef] = useState(null);
  const [user, setUser] = useState(null);

  const taskDocRef = doc(db, "todos", "user-tasks");

  useEffect(() => {
    const loadDocument = async () => {
      try {
        const docSnap = await getDoc(taskDocRef);
      if (docSnap.exists()) {
        setTasks(docSnap.data().tasks || []);
      } else {
        await setDoc(taskDocRef, { tasks: [] });
      }
      setDocRef(taskDocRef);
    } catch (error) {
      console.error("Error loading tasks:", error);
    }
  };

    loadDocument();
  }, []);

  const handleAuthClick = () => {
    if (user) {
      signOut(auth).catch(console.error);
      setUser(null);
    } else {
      signInWithPopup(auth, google)
        .then((result) => setUser(result.user))
        .catch(console.error);
    }
  };

  const saveTasks = async (updatedTasks) => {
    if (!docRef) return;
    try {
      await updateDoc(docRef, { tasks: updatedTasks });
    } catch (error) {
      console.error("Error saving tasks:", error);
    }
  };

  const addTask = () => {
    if (!newTask.trim()) return;
    const updated = [...tasks, { text: newTask, done: false }];
    setTasks(updated);
    saveTasks(updated);
    setNewTask("");
  };

  const toggleTask = (index) => {
    const updated = [...tasks];
    updated[index].done = !updated[index].done;
    setTasks(updated);
    saveTasks(updated);
  };

  const deleteTask = (index) => {
    const updated = tasks.filter((_, i) => i !== index);
    setTasks(updated);
    saveTasks(updated);
  };

  


return (
  <>
    
  <div className = "content">
    <h1>To-Do List...</h1>
    <button onClick={handleAuthClick}>
      {user ? "Sign Out" : "Sign In with Google"}
    </button>

    {user && (
      <>
      <div className="input-section">
        <input
          type="text"
          placeholder="Add a task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          style={{ backgroundColor: "#3a2a1e"}}
        />
        <button onClick={addTask}>Add</button>
      </div>

      <ul>
        {tasks.map((task, index) => (
          <li key={index} className={task.done ? "done" : ""}>
            <div className="task-left">
              <input
                type="checkbox"
                style={{ accentColor: "#321908"}}
                checked={task.done}
                onChange={() => toggleTask(index)}
              />
              <span className= {`task-text ${task.done ? "done-text" : ""}`}>{task.text}</span>
            </div>
            <button className="cross" onClick={() => deleteTask(index)}>×</button>
          </li>
        ))}
      </ul>
      </>
     )}
  </div>
  </>
  );
}

export default App;
