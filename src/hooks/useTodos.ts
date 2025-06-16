"use client";

import React, { startTransition, useOptimistic, useState } from "react";
import { BASE_URL } from "@/lib/config";
import { Todo } from "@prisma/client";

export const useTodos = (initialTodos: Todo[]) => {
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

  const handleSubmit = async () => {
    startTransition(async () => {
      addOptimisticTodo(text);

      try {
        await createTodos();
        const todos = await fetchTodos();
        setTodos(todos);
      } catch (err) {
        console.error(err);
        alert("エラーが発生しました");
      }
    });
  };

  const fetchTodos = async () => {
    const res = await fetch(BASE_URL + "/todos");
    const data = await res.json();
    return data.todos;
  };

  const createTodos = async () => {
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
  };

  return { text, handleChange, handleSubmit, optimisticTodos };
};
