FROM node:14-slim

RUN mkdir -p /app
RUN mkdir -p /app/dist
WORKDIR /app

COPY package.json .
RUN npm i --only=production

ENV NODE_ENV=dev

EXPOSE 3000

CMD [ "node", "dist/bundle" ]