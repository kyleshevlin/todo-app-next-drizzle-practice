import { getTodos } from '@/actions/todos'
import { Todos } from '@/components/Todos'

export default async function Home() {
  const todos = await getTodos()

  return <Todos todos={todos} />
}
