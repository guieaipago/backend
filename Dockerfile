FROM node:22-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY tsconfig.json ./
COPY src ./src

RUN npm run build

VOLUME ["/app/uploads"]
EXPOSE 3000

CMD ["node", "dist/server.js"]
