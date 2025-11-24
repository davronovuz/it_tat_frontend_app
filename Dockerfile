# Dockerfile (frontend)
############################################################
# Build stage
FROM node:20-alpine AS build
WORKDIR /app

# copy package manifests first for layer caching
COPY package*.json ./
RUN npm ci --silent

# copy rest and build
COPY . .
RUN npm run build

############################################################
# Production stage (nginx)
FROM nginx:1.27-alpine

# remove default html (clean)
RUN rm -rf /usr/share/nginx/html/*

# copy custom nginx config (must be present next to Dockerfile)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# copy built files from build stage
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

# use default nginx entrypoint and cmd
