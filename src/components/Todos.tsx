'use client'

import type { Todo } from '@/types/todo'
import { AddTodo } from './AddTodo'
import { TodoItem } from './TodoItem'
import React from 'react'

type Props = {
  todos: Todo[]
}

export function Todos({ todos: initialTodos }: Props) {
  const [todos, setTodos] = React.useState(initialTodos)

  const handleAddTodoSuccess = React.useCallback((todo: Todo) => {
    setTodos(currentTodos => [...currentTodos, todo])
  }, [])

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        {todos.length ? (
          todos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onDeleteSuccess={id => {
                setTodos(currentTodos =>
                  currentTodos.filter(todo => todo.id !== id),
                )
              }}
            />
          ))
        ) : (
          <div>No todos yet!</div>
        )}
      </div>

      <div className="max-w-[400px]">
        <AddTodo onSuccess={handleAddTodoSuccess} />
      </div>
    </div>
  )
}
