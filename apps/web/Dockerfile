# Dev Dockerfile for web
FROM node:22.18.0-alpine3.21 AS dev

# Install dependencies
RUN apk add --no-cache libc6-compat bash

# Set working dir
WORKDIR /app

# Copy package manifests
COPY package.json turbo.json ./ 
COPY package-lock.json* ./ 

# Install root dependencies
RUN npm install

# Copy rest of the monorepo (source)
COPY . .

# Environment
ENV NODE_ENV=development

# Install app-specific deps
RUN npm install --workspace=apps/web

# Expose dev ports
EXPOSE 5173

# Run dev server for configurator
CMD ["npm", "run", "dev", "--workspace=apps/web"]
