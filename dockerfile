FROM node:22.19.0-alpine

WORKDIR /shipnow

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

RUN pnpm install

COPY . .

EXPOSE 3000

CMD ["node", "src/server.js"]