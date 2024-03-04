import 'dotenv/config'
import { drizzle } from 'drizzle-orm/postgres-js'
import { migrate } from 'drizzle-orm/postgres-js/migrator'
import postgres from 'postgres'

const migrationClient = postgres(process.env.DATABASE_URL ?? '', { max: 1 })

async function runMigrations() {
  console.log('starting migrations...')

  await migrate(drizzle(migrationClient), { migrationsFolder: 'drizzle' })

  console.log('...ending migrations')
}

runMigrations()
  .catch(console.error)
  .finally(() => {
    process.exit(0)
  })
