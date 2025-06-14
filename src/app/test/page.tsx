"use client";

import { Todo } from "@prisma/client";
import React, { startTransition, useEffect, useOptimistic, useState } from "react";

// 楽観的更新時の型エラー対策
type OptimisticTodo = Todo & {
  sending?: boolean;
}

function Page() {
  const [text, setText] = useState("");
  const [loading, setIsLoading] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);

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

  // 初回表示時はLoadingが必要
  useEffect(() => {
    setIsLoading(true)
    fetchTodos().finally(() => setIsLoading(false))
  }, []);

  const fetchTodos = async () => {
    const res = await fetch("/api/todos");
    const data = await res.json();
    setTodos(data.todos);
  };

  // 楽観的更新作業はここで行う
  const handleSubmit = async () => {
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
          fetchTodos();
          setText("");
        }
      } catch (err) {
        console.error(err);
      }
    })
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <input
        type="text"
        className="border"
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
      <button onClick={handleSubmit}>送信</button>

      {/* 一覧UI */}
      <ul>
        {optimisticTodos.map((todo: OptimisticTodo) => (
          <li key={todo.id}>{todo.title}<span className="text-blue-400">{todo.sending ? '...送信中' : ''}</span></li>
        ))}
      </ul>
    </div>
  );
}

export default Page;
