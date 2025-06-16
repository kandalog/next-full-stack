"use client";

import React, { useState } from "react";

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const fetchTodos = async () => {
    const res = await fetch(BASE_URL + "/todos");
    const data = await res.json();
    return data.todos;
  };

  const handleSubmit = async () => {
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
        <TodoList todos={todos} />
      </CardContent>
    </Card>
  );
}

export default Todos;
