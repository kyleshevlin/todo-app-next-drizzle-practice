'use server'

import { db } from '@/db/drizzle'
import { todo } from '@/db/schema'
import type { Todo } from '@/types/todo'
import { asc, eq } from 'drizzle-orm'

export async function addTodo({ text }: Pick<Todo, 'text'>) {
  return await db.insert(todo).values({ text }).returning()
}

export async function getTodos() {
  return await db.select().from(todo).orderBy(asc(todo.id))
}

export async function updateTodo({ id, text }: Pick<Todo, 'id' | 'text'>) {
  return await db.update(todo).set({ text }).where(eq(todo.id, id))
}

export async function toggleTodo({ id, done }: Pick<Todo, 'id' | 'done'>) {
  return await db.update(todo).set({ done }).where(eq(todo.id, id))
}

export async function deleteTodo({ id }: Pick<Todo, 'id'>) {
  return await db.delete(todo).where(eq(todo.id, id))
}
