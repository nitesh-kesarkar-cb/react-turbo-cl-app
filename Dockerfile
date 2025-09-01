# ------------------------
# 1. Base image
# ------------------------
FROM node:22.18.0-alpine3.21 AS base
RUN apk add --no-cache libc6-compat bash
WORKDIR /app

# ------------------------
# 2. Prune monorepo for target app
# ------------------------
FROM base AS prune
ARG APP   

# Copy only package manifests first
COPY package.json turbo.json ./
COPY package-lock.json* ./

# Ensure turbo is installed locally
RUN npm install turbo

# Copy rest of repo (after turbo is installed)
COPY . .

# Run prune
RUN npx turbo prune --scope=$APP --docker   # <-- use npx, not global turbo

# ------------------------
# 3. Install dependencies
# ------------------------
FROM base AS installer
WORKDIR /app
COPY --from=prune /app/out/json/ ./
COPY --from=prune /app/out/package-lock.json ./package-lock.json
RUN npm install

# ------------------------
# 4. Build app
# ------------------------
FROM base AS builder
ARG APP
WORKDIR /app
COPY --from=prune /app/out/full/ ./
COPY --from=installer /app/node_modules ./node_modules
RUN npm run build --workspace=apps/$APP

# ------------------------
# 5. Runtime
# ------------------------
FROM nginx:alpine AS runner
ARG APP
WORKDIR /usr/share/nginx/html

COPY --from=builder /app/apps/$APP/dist ./

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
