import { BASE_URL } from "@/lib/config";
import { Todo } from "@prisma/client";

export const fetchTodos = async (): Promise<Todo[]> => {
  const res = await fetch(BASE_URL + "/todos");
  const data = await res.json();
  return data.todos;
};

export const createTodo = async (title: string): Promise<void> => {
  const res = await fetch(BASE_URL + "/todos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title }),
  });

  if (!res.ok) {
    throw new Error("エラーが発生しました");
  }
};

export const updateTodo = async (id: number): Promise<void> => {
  const res = await fetch(BASE_URL + `/todos/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("エラーが発生しました");
  }
};

export const deleteTodo = async (id: number): Promise<void> => {
  const res = await fetch(BASE_URL + `/todos/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("エラーが発生しました");
  }
};
