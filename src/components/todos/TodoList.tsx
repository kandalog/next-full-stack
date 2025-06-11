import { Todo } from "@prisma/client";
import React from "react";
import TodoItem from "./TodoItem";

type Props = {
  todos: Todo[];
};

function TodoList({ todos }: Props) {
  return (
    <>
      {todos.map((todo: Todo) => (
        <TodoItem key={todo.id}>{todo.title}</TodoItem>
      ))}
    </>
  );
}

export default TodoList;
