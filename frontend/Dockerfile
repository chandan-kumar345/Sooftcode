# Stage 1: Build source
FROM node:20-alpine AS builder
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci
COPY . .

# Set API URL at build time for next.js static/client compiles
ENV NEXT_PUBLIC_API_URL=http://localhost:5000/api
RUN npm run build

# Stage 2: Production runner
FROM node:20-alpine
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app/package*.json ./
COPY --from=builder /usr/src/app/.next ./.next
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/public ./public

ENV NODE_ENV=production
ENV PORT=3000
EXPOSE 3000

CMD ["npm", "start"]
