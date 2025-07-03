"use client";

import React, { startTransition, useOptimistic, useState } from "react";
import { Todo } from "@prisma/client";
import { createTodo, deleteTodo, fetchTodos, updateTodo } from "@/lib/api/todos";

type OptimisticAction =
  | { type: "create"; text: string }
  | { type: "update"; id: number }
  | { type: "delete"; id: number };

export const useTodos = (initialTodos: Todo[]) => {
  const [todos, setTodos] = useState(initialTodos);
  const [text, setText] = useState("");

  const [optimisticTodos, updateOptimisticTodos] = useOptimistic(todos, (state, action: OptimisticAction) => {
    switch (action.type) {
      case "create":
        const todo = {
          id: Math.random() * 100,
          title: action.text,
          completed: false,
          createdAt: new Date(),
          updatedAt: new Date(),
          sending: true,
        };
        return [...state, todo];
      case "update":
        const targetTodo = state.find((s) => s.id === action.id);
        if (!targetTodo) {
          return [...state];
        }
        return state.map((s) => (s.id === action.id ? { ...s, completed: !s.completed } : s));
      case "delete":
        const deleteTodo = state.find((s) => s.id === action.id);
        if (!deleteTodo) {
          return [...state];
        }
        return state.filter((s) => action.id !== s.id);
    }
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleSubmit = async () => {
    startTransition(async () => {
      updateOptimisticTodos({ type: "create", text });

      try {
        await createTodo(text);
        setText("");
        const todos = await fetchTodos();
        setTodos(todos);
      } catch (err) {
        console.error(err);
        alert("エラーが発生しました");
      }
    });
  };

  const handleCheckChange = async (id: number) => {
    startTransition(async () => {
      updateOptimisticTodos({ type: "update", id });

      try {
        await updateTodo(id);
        const todos = await fetchTodos();
        setTodos(todos);
      } catch (err) {
        console.error(err);
        alert("エラーが発生しました");
      }
    });
  };

  const handleClickDelete = async (id: number) => {
    startTransition(async () => {
      updateOptimisticTodos({ type: "delete", id });
      try {
        await deleteTodo(id);
        const todos = await fetchTodos();
        setTodos(todos);
      } catch (err) {
        console.error(err);
        alert("エラーが発生しました");
      }
    });
  };

  return {
    text,
    handleChange,
    handleSubmit,
    optimisticTodos,
    handleCheckChange,
    handleClickDelete,
  };
};
