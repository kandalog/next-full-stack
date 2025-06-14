import TodoContainer from "./components/TodoContainer";

async function TodoPage() {

  const res = await fetch('http://localhost:3000/api/todos/');
  const data = await res.json();
  const todos = data.todos
  return  <TodoContainer initialTodos={todos} />
}

export default TodoPage;
