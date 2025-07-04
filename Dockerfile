FROM node:20-bookworm as builder
WORKDIR /app
COPY . .
RUN yarn
RUN yarn build

FROM node:20-bookworm as runner
WORKDIR /app
COPY --from=builder /app/lib ./lib
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/yarn.lock ./yarn.lock
COPY --from=builder /app/web ./web
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 80
CMD ["node", "lib/index.js"]
