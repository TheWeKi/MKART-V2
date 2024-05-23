# Prerequisites

Node LTS: https://nodejs.org/en/download/package-manager

Docker: https://www.docker.com/products/docker-desktop/


# Starting Client

```bash 
cd client/ && npm i && npm run dev
```


# Setting Environment Variables For Server

```
Create a .env file in the server directory and copy .env.example content to .env file

Use your own values for the variables
```


# Starting Server ( Two Ways )

## 1. Starting Server Using Node

```bash
cd server/ && npm i && npm start
```


## 2. Starting Server Using Docker

```bash
cd server/ && docker run -p 8080:8080 --env-file .env theweki/mkart:mkart-server
```
