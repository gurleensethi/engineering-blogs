FROM node:15.6.0-alpine3.12 AS BUILD

WORKDIR /app

COPY ./ ./

RUN npm ci

RUN npm run build

EXPOSE 3000

CMD [ "npm", "run", "heroku:start" ]