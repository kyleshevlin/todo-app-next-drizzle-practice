'use client'

import { addTodo } from '@/actions/todos'
import { Todo } from '@/types/todo'
import React from 'react'

type Props = {
  onFailure?: (err: Error) => void
  onSuccess?: (response: Todo) => void
}

export function AddTodo({ onSuccess, onFailure }: Props) {
  const [value, setValue] = React.useState('')

  function handleSubmit() {
    addTodo({ text: value })
      .then(([response]) => {
        setValue('')
        onSuccess?.(response)
      })
      .catch(err => {
        console.error(err)
        onFailure?.(err)
      })
  }

  return (
    <form action={handleSubmit}>
      <div className="flex flex-col gap-2">
        <label className="flex flex-col gap-2">
          <span className="font-bold">New Todo</span>
          <input
            className="rounded border-2 border-gray-300 p-2"
            name="new-todo"
            onChange={e => {
              setValue(e.target.value)
            }}
            type="text"
            value={value}
          />
        </label>

        <button className="rounded bg-blue-600 p-2 text-white" type="submit">
          Add
        </button>
      </div>
    </form>
  )
}
