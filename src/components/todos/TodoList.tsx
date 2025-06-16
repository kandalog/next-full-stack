import { Todo } from "@prisma/client";
import React from "react";
import TodoItem from "./TodoItem";
import If from "../utils/If";
import Unless from "../utils/Unless";

type Props = {
  todos: Todo[];
};

function TodoList({ todos }: Props) {
  const hasTodos = todos.length > 0;

  return (
    <>
      <If condition={hasTodos}>
        {todos.map((todo: Todo) => (
          <TodoItem key={todo.id}>{todo.title}</TodoItem>
        ))}
      </If>
      <Unless condition={hasTodos}>
        <p>タスクがありません。</p>
      </Unless>
    </>
  );
}

export default TodoList;
