FROM node:latest

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

RUN Set-ExecutionPolicy Unrestricted -Scope Process ; \
    json-server --watch src/data/db.json --port 3004 & \
    npm start
