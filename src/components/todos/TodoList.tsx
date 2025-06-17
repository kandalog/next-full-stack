import React from "react";
import TodoItem from "./TodoItem";
import If from "../utils/If";
import Unless from "../utils/Unless";
import { OptimisticTodo } from "@/types/todos.type";

type Props = {
  todos: OptimisticTodo[];
  onCheckedChange: (id: number) => void;
};

function TodoList({ todos, onCheckedChange }: Props) {
  const hasTodos = todos.length > 0;

  return (
    <>
      <If condition={hasTodos}>
        {todos.map((todo: OptimisticTodo) => (
          <TodoItem
            key={todo.id}
            id={todo.id}
            sending={todo.sending}
            checked={todo.completed}
            onCheckedChange={onCheckedChange}
          >
            {todo.title}
            {todo.sending ? <span className="ml-4">送信中...</span> : ""}
          </TodoItem>
        ))}
      </If>
      <Unless condition={hasTodos}>
        <p>タスクがありません。</p>
      </Unless>
    </>
  );
}

export default TodoList;
