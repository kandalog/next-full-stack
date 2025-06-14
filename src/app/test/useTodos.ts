'use client'

import { Todo } from "@prisma/client";
import { startTransition, useOptimistic, useState } from "react"
import { OptimisticTodo } from "./todos.type";

export const useTodos = (initialTodos: Todo[]) => {
  const [text, setText] = useState("");
  const [todos, setTodos] = useState<Todo[]>(initialTodos);

  const [optimisticTodos, addOptimisticTodo] = useOptimistic(todos, (state: OptimisticTodo[], newTodo: string) => {
    const lastTodo = state[state.length - 1]
    const id = lastTodo.id + 1;
    return [...state, {
      id: id, 
      title: newTodo,
      completed: false,
      createdAt: new Date,
      updatedAt: new Date,
      sending: true
    }]
  })

  const fetchTodos = async () => {
    const res = await fetch("/api/todos");
    return res.json()
  };

  // 楽観的更新作業はここで行う
  const handleClick = async () => {
    // トランジション開始
    startTransition(async () => {
      // 楽観的な更新をトリガーする
      addOptimisticTodo(text)
      try {
        const res = await fetch("/api/todos", {
          method: "POST",
          body: JSON.stringify({ title: text }),
        });
        if (res.ok) {
          const data = await fetchTodos();
          setTodos(data.todos)
          setText("");
        }
      } catch (err) {
        console.error(err);
      }
    })
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value)
  }

  return {
     text,
     todos,
     optimisticTodos,
     handleClick,
     handleChange
  }
}