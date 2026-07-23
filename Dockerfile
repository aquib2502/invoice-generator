# -------- Builder --------
FROM node:20-slim AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build


# -------- Runtime --------
FROM node:20-slim
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=4786

COPY package*.json ./
RUN npm ci --omit=dev

COPY --from=builder /app/dist ./dist

EXPOSE 4786
CMD ["npm", "start"]
