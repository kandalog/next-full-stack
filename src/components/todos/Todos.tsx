import React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import TodoList from "./TodoList";
import If from "../utils/If";
import Unless from "../utils/Unless";

async function Todos() {
  // Server Component内でFetchする
  const res = await fetch("http://localhost:3000/api/todos");
  if (!res.ok) {
    alert("todosの取得に失敗しました");
  }

  const { todos } = await res.json();
  const hasTodos = todos.length > 0;

  return (
    <Card className="max-w-[600px] mx-auto my-10">
      <CardHeader>
        <CardTitle className="text-3xl bold">TODOリスト</CardTitle>
      </CardHeader>

      {/* AddTodoForm Client Component */}
      {/* 再レンダリングはできる限り末端で行う */}
      <CardContent className="flex w-full items-center gap-2 py-6">
        <Input className="h-12 text-lg" />
        <Button
          type="submit"
          variant="outline"
          className="bg-[#6366F1] text-white text-2xl h-12 px-6 hover:bg-[#6366F1] hover:text-white"
        >
          追加
        </Button>
      </CardContent>

      {/* TODO List */}
      <CardContent>
        <If condition={hasTodos}>
          <TodoList todos={todos} />
        </If>
        <Unless condition={hasTodos}>
          <p>タスクがありません。</p>
        </Unless>
      </CardContent>
    </Card>
  );
}

export default Todos;
