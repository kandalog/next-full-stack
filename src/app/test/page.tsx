import TodoContainer from "./components/TodoContainer";

const todos = [
  {
    id: 1,
    title: "買い物に行く",
    completed: false,
    createdAt: new Date("2024-01-15T10:00:00Z"),
    updatedAt: new Date("2024-01-15T10:00:00Z"),
  },
  {
    id: 2,
    title: "コードレビューを完了する",
    completed: true,
    createdAt: new Date("2024-01-14T14:30:00Z"),
    updatedAt: new Date("2024-01-15T09:15:00Z"),
  },
];

async function TodoPage() {
  return <TodoContainer initialTodos={todos} />;
}

export default TodoPage;
