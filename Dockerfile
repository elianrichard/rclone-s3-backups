ARG NODE_VERSION='22.14.0'

FROM node:${NODE_VERSION}-alpine AS build

ENV NPM_CONFIG_UPDATE_NOTIFIER=false
ENV NPM_CONFIG_FUND=false

WORKDIR /app

COPY package*.json tsconfig.json ./
COPY src ./src

RUN npm ci && \
    npm run build && \
    npm prune --production

FROM node:${NODE_VERSION}-alpine

WORKDIR /app

COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/package.json ./

RUN apk add --no-cache curl unzip

RUN curl -Of https://downloads.rclone.org/rclone-current-linux-amd64.zip && \
    unzip rclone-current-linux-amd64.zip && \
    cd rclone-*-linux-amd64 && \
    cp rclone /usr/bin/rclone && \
    chmod 755 /usr/bin/rclone && \
    cd .. && rm -rf rclone-*-linux-amd64 rclone-current-linux-amd64.zip

CMD rclone --version && \
    node dist/index.js
