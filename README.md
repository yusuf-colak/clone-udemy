# microprefix boilerplate

node version: 18.17

## Start projects
npx nx run-many --target=serve --projects=api,website

## Prisma
1. npx prisma generate
2. npx prisma migrate dev

# Prisma DB
npx prisma studio
# Prisma Graph
nx graph

# Docker
docker build -f ./Dockerfile . -t nx-boilerplate
docker compose up
