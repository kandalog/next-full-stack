"use client";

import React from "react";

import { Todo } from "@prisma/client";
import TodoList from "./TodoList";
import InputArea from "./InputArea";
import { useTodos } from "../useTodos";

type Props = {
  initialTodos: Todo[];
};

function TodoContainer({ initialTodos }: Props) {
  const { text, optimisticTodos, handleClick, handleChange } = useTodos(initialTodos);

  return (
    <div>
      <InputArea text={text} onChange={handleChange} onClick={handleClick} />
      <TodoList todos={optimisticTodos} />
    </div>
  );
}

export default TodoContainer;
