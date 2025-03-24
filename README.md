# ctmp-backend

Collaborative Task Management Platform Backend

1. Create a .env.{env} file and copy the env variables from .env.example // env=local|dev|stage|prod
2. Use 'node migration/migrate.js' command to create the database. While prompted, provide host, user and password
3. Use 'node migration/admin.seeder.js' command to create the first super admin. While prompted, provide the needed data
4. Use 'yarn {env}' or 'npm run {env}' to start the application // env=local|dev|stage|prod
