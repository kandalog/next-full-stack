"use client";

import React, { startTransition, useOptimistic, useState } from "react";

import { BASE_URL } from "@/lib/config";
import { Todo } from "@prisma/client";

import TodoList from "./TodoList";
import InputArea from "./InputArea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Props = {
  initialTodos: Todo[];
};

function Todos({ initialTodos }: Props) {
  const [todos, setTodos] = useState(initialTodos);
  const [text, setText] = useState("");

  const [optimisticTodos, addOptimisticTodo] = useOptimistic(
    todos,
    (state, newTodo: string) => {
      const todo = {
        id: Math.random() * 100,
        title: newTodo,
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        sending: true,
      };
      return [...state, todo];
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const fetchTodos = async () => {
    const res = await fetch(BASE_URL + "/todos");
    const data = await res.json();
    return data.todos;
  };

  const handleSubmit = async () => {
    startTransition(async () => {
      addOptimisticTodo(text);

      try {
        const res = await fetch(BASE_URL + "/todos", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title: text }),
        });

        if (!res.ok) {
          throw new Error("エラーが発生しました");
        }
        const todos = await fetchTodos();
        setTodos(todos);
      } catch (err) {
        console.error(err);
        alert("エラーが発生しました");
      }
    });
  };

  return (
    <Card className="max-w-[600px] mx-auto my-10">
      <CardHeader>
        <CardTitle className="text-3xl bold">TODOリスト</CardTitle>
      </CardHeader>
      <CardContent className="flex w-full items-center gap-2 py-6">
        <InputArea text={text} onChange={handleChange} onClick={handleSubmit} />
      </CardContent>
      <CardContent>
        <TodoList todos={optimisticTodos} />
      </CardContent>
    </Card>
  );
}

export default Todos;
