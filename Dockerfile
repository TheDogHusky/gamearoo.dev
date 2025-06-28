FROM node:20-bookworm as builder
WORKDIR /app
COPY . .
RUN npm i
RUN npm run build

FROM node:20-bookworm as runner
WORKDIR /app
COPY --from=builder /app/lib ./lib
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/package-lock.json ./package-lock.json
COPY --from=builder /app/web ./web
RUN npm i --omit=dev

EXPOSE 3000
CMD ["node", "lib/index.js"]