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
            <div className="border-b border-b-slate-300 py-2" key={todo.id}>
              <TodoItem
                todo={todo}
                onDeleteSuccess={id => {
                  setTodos(currentTodos =>
                    currentTodos.filter(todo => todo.id !== id),
                  )
                }}
              />
            </div>
          ))
        ) : (
          <div>No todos yet!</div>
        )}
      </div>

      <AddTodo onSuccess={handleAddTodoSuccess} />
    </div>
  )
}
