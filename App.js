import "./App.css";
import { useState, useEffect } from "react"; // <-- import useEffect

function App() {
  const [input, setInput] = useState(""); // State for input value
  // Each task: { text: string, completed: boolean }
  const [tasks, setTasks] = useState(() => {
    // Load tasks from localStorage on initial render
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });
  const [activeCategory, setActiveCategory] = useState("all");

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Add a new task
  const addTask = () => {
    if (input.trim() !== "") {
      setTasks([...tasks, { text: input, completed: false }]);
      setInput("");
    }
  };

  // Toggle completed state
  const toggleTask = (index) => {
    setTasks(
      tasks.map((task, i) =>
        i === index ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Delete a task
  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  // Filter tasks based on activeCategory
  const filteredTasks = tasks.filter((task) => {
    if (activeCategory === "completed") return task.completed;
    if (activeCategory === "not-completed") return !task.completed;
    return true;
  });

  return (
    <div className="App">
      <h1>ToDo-App</h1>
      <input
        type="text"
        placeholder="Write the task here"
        className="input"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={addTask}>Add</button>
      <div className="tasks-field">
        <div className="categories">
          <div
            className={`btn all${activeCategory === "all" ? " active" : ""}`}
            onClick={() => setActiveCategory("all")}
          >
            All tasks
          </div>
          <div
            className={`btn completed${
              activeCategory === "completed" ? " active" : ""
            }`}
            onClick={() => setActiveCategory("completed")}
          >
            Completed
          </div>
          <div
            className={`btn not-completed${
              activeCategory === "not-completed" ? " active" : ""
            }`}
            onClick={() => setActiveCategory("not-completed")}
          >
            Not completed
          </div>
        </div>
        <ul className="tasks">
          {filteredTasks.map((task, index) => (
            <li
              key={index}
              className={`task${task.completed ? " com" : ""}`}
              onClick={() => toggleTask(tasks.indexOf(task))}
            >
              <div className="div">{task.text}</div>
              <span
                className="del"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteTask(tasks.indexOf(task));
                }}
              >
                delete
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
