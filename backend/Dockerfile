# Stage 1 (Build)
FROM node:15.6.0-alpine3.12 AS BUILD

COPY ./ app/

WORKDIR /app

RUN npm ci

RUN npm run build

CMD [ "node", "dist/main" ]