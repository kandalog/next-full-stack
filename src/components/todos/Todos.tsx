"use client";

import { Todo } from "@prisma/client";

import TodoList from "./TodoList";
import InputArea from "./InputArea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTodos } from "@/hooks/useTodos";

type Props = {
  initialTodos: Todo[];
};

function Todos({ initialTodos }: Props) {
  const { text, handleChange, handleSubmit, optimisticTodos } =
    useTodos(initialTodos);

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
