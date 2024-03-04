'use client'

import { deleteTodo, toggleTodo, updateTodo } from '@/actions/todos'
import { Todo } from '@/types/todo'
import React from 'react'

const dateFormatter = Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  hour12: true,
})

type Props = {
  onDeleteSuccess?: (id: Todo['id']) => void
  todo: Todo
}

export function TodoItem({ onDeleteSuccess, todo }: Props) {
  const [editing, setEditing] = React.useState(false)
  const [checked, setChecked] = React.useState(todo.done)
  const [text, setText] = React.useState(todo.text)

  function handleToggle() {
    const nextDone = !checked
    setChecked(nextDone)

    toggleTodo({ id: todo.id, done: nextDone }).catch(err => {
      console.error(err)
      setChecked(checked)
    })
  }

  function handleUpdate(data: FormData) {
    const nextText = data.get('todo-text') as string

    setEditing(false)
    updateTodo({ id: todo.id, text: nextText })
  }

  function handleDelete() {
    const result = confirm('Are you sure you want to delete this todo item?')

    if (result) {
      deleteTodo({ id: todo.id })
        .then(() => {
          onDeleteSuccess?.(todo.id)
        })
        .catch(console.error)
    }
  }

  const createdAt = new Date(todo.createdAt)

  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <input type="checkbox" onChange={handleToggle} checked={checked} />

        {editing ? (
          <TodoForm action={handleUpdate} onTextChange={setText} value={text} />
        ) : (
          <button
            className={checked ? 'line-through' : ''}
            onClick={() => {
              setEditing(true)
            }}
          >
            {text}
          </button>
        )}
      </div>

      <div className="flex gap-4">
        <div className="text-gray-500">
          {dateFormatter.format(todo.createdAt)}
        </div>

        <button
          className="rounded bg-slate-300 px-2 py-1 leading-none text-black"
          onClick={handleDelete}
        >
          <span className="block -translate-y-px">&times;</span>
        </button>
      </div>
    </div>
  )
}

function TodoForm({
  action,
  onTextChange,
  value,
}: {
  action: (data: FormData) => void
  onTextChange: (text: string) => void
  value: string
}) {
  return (
    <form action={action}>
      <div className="flex items-center gap-1">
        <input
          className="rounded border-2 border-gray-300 px-2 py-1"
          name="todo-text"
          onChange={e => {
            onTextChange(e.target.value)
          }}
          type="text"
          value={value}
        />

        <button
          className="rounded bg-blue-600 px-3 py-1 text-white"
          type="submit"
        >
          Save
        </button>
      </div>
    </form>
  )
}
