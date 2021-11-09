FROM node:17.0.1-alpine3.14 as builder

RUN mkdir /src
WORKDIR /src

COPY . .

RUN npm ci --legacy-peer-deps || npm install --legacy-peer-deps
RUN npm run build
RUN npm prune --production

### RUNNER ###
FROM node:17.0.1-alpine3.14

RUN mkdir /app
WORKDIR /app

COPY --from=builder /src/dist /app
COPY --from=builder /src/node_modules /app/node_modules
COPY --from=builder /src/package.json /app/package.json
COPY --from=builder /src/package-lock.json /app/package-lock.json

CMD node /app/main

