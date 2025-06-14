import { Todo } from "@prisma/client";

export type OptimisticTodo = Todo & {
  sending?: boolean;
}