FROM node:16.19.1-alpine

WORKDIR /app

COPY . .

RUN apk add --no-cache python3 make g++
RUN npm install

CMD ["npm", "run", "start"]
