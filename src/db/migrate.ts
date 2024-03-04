import 'dotenv/config'
import { drizzle } from 'drizzle-orm/postgres-js'
import { migrate } from 'drizzle-orm/postgres-js/migrator'
import postgres from 'postgres'

const connectionStr = process.env.DATABASE_URL ?? ''

async function runMigrations() {
  if (!connectionStr) return

  const migrationClient = postgres(connectionStr, { max: 1 })
  const db = drizzle(migrationClient)

  console.log('starting migrations...')

  await migrate(db, { migrationsFolder: 'drizzle' })
  await migrationClient.end()

  console.log('...ending migrations')
}

runMigrations()
  .catch(console.error)
  .finally(() => {
    process.exit(0)
  })
