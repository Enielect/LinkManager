#### This is to document most if not all of the problesm I faced while creating this project

1. I encounterd a situation where update my database using `npx drizzle-kit push` was hanging in the 'pulling schema from database' loading state, the solution I found online was to do this: 

```
a temporary fix what is worked for me is to change the port to 5432 (supavisor session) instead of 6543 in the connection string, like this:
postgres://postgres.apbkobhfnmcqqzqeeqss:[YOUR-PASSWORD]@aws-0-ca-central-1.pooler.supabase.com:5432/postgres
then changing it back after a finished db push
```

2. Never expose stack traces (use NODE_ENV=production to hide them).
