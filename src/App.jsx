import Task from "./components/Task";
import { useState, useEffect, useRef } from "react";

export default function App() {
  const [todos, setTodos] = useState(getTodos());
  const [record, setRecord] = useState("");
  const curr = useRef(todos.length);

  function addTodo(e) {
    e.preventDefault();
    if (record.trim()) {
      setTodos((prevTodos) => [
        ...prevTodos,
        { task: record, id: curr.current, status: false }
      ]);
      curr.current += 1;
      setRecord("");
    }
  }

  function getTodos() {
    return JSON.parse(localStorage.getItem("todos")) || [];
  }

  function handleDelete(id) {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  }

  function handleEdit(id, newTask) {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, task: newTask } : todo
      )
    );
  }

  function handleStatusChange(id, newStatus) {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, status: newStatus } : todo
      )
    );
  }

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <div className="body">
      <h1 className="text-5xl text-center uppercase text-accent font-playwrite mt-24 mb-12">
        BLUEBERRY TODO APP
      </h1>
      <div className="flex flex-col items-center w-[700px] max-w-full gap-3">
        <form className="relative w-full" onSubmit={addTodo}>
          <input
            type="text"
            name="add-todo"
            placeholder="Add Task"
            value={record}
            id="todo-input"
            autoComplete="off"
            className="box-border w-full p-3 pl-5 border-2 border-secondary rounded-full bg-transparent text-text focus:outline-none caret-accent"
            onChange={(e) => setRecord(e.target.value)}
          />
          <button
            type="submit"
            id="add-button"
            className="absolute top-0 right-0 bg-accent h-full px-8 font-semibold text-background rounded-full cursor-pointer"
          >
            ADD
          </button>
        </form>
        <ul id="todo-list" className="w-full flex flex-col gap-2">
          {todos.map((todo) => (
            <Task
              key={todo.id}
              todo={todo}
              onDelete={handleDelete}
              onEdit={handleEdit}
              onStatusChange={handleStatusChange}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}
