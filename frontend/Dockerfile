FROM node:14.15.4 AS BUILD

WORKDIR /app

COPY ./ ./

RUN npm ci

RUN npm run build

EXPOSE 3000

CMD [ "npm", "run", "heroku:start" ]