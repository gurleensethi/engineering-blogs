# Stage 1 (Build)
FROM node:15.8.0-alpine3.10 AS BUILD

COPY ./ app/

WORKDIR /app

RUN npm ci

RUN npx prisma generate

RUN npm run build

CMD [ "node", "dist/main" ]