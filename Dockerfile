FROM node:17.0.1-alpine3.14 as builder

RUN mkdir /src
WORKDIR /src

COPY . .

ARG BUILD_DATE
MAINTAINER Nikolay Galko
LABEL maintainer="nikolay.galko_=dot=_gmail.com"
LABEL org.label-schema.build-date=$BUILD_DATE
LABEL org.label-schema.description="Galek nodejs testcase runtime"
LABEL org.label-schema.url="https://galek.ru/"

RUN npm ci --legacy-peer-deps || npm install --legacy-peer-deps
RUN npm run build
RUN npm prune --production

### RUNNER ###
FROM node:17.0.1-alpine3.14

RUN mkdir /app
WORKDIR /app

ARG BUILD_DATE
MAINTAINER Nikolay Galko
LABEL maintainer="nikolay.galko_=dot=_gmail.com"
LABEL org.label-schema.build-date=$BUILD_DATE
LABEL org.label-schema.description="Galek nodejs testcase runtime"
LABEL org.label-schema.url="https://galek.ru/"

COPY --from=builder /src/dist /app
COPY --from=builder /src/node_modules /app/node_modules

CMD node /app/main

