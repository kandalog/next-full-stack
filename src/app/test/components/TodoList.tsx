import React from 'react'

import { Todo } from '@prisma/client'
import { OptimisticTodo } from '../todos.type'

type Props = {
  todos: Todo[]
}

function TodoList({ todos }: Props) {
  return (
    <ul>
    {todos.map((todo: OptimisticTodo) => (
      <li key={todo.id}>{todo.title}<span>{todo.sending ? '...送信中' : ''}</span></li>
    ))}
  </ul>
  )
}

export default TodoList