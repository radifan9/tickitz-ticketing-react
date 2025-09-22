# Stage 1: Building App
FROM node:lts-alpine3.21 AS builder

# Set working directory
WORKDIR /app

# Copy file essensial untuk install dependency
COPY package.json package-lock.json ./

# Install package
RUN npm ci

# Copy sisanya
COPY . .

ENV VITE_BE_HOST=backend
ENV VITE_POSTER_PATH=backend/api/v1/img/posters
ENV VITE_BACKDROP_PATH=backend/api/v1/img/backdrops
ENV VITE_CINEMA_PATH=backend/api/v1/img/cinemas
ENV VITE_PROFILE_PATH=backend/api/v1/img/profile_pics

# Build dengan command vite build
RUN npm run build

# Stage 2: setup app
FROM nginx:stable-bookworm

# Copy premade config
COPY --from=builder /app/nginx/nginx.conf /etc/nginx/
COPY --from=builder /app/nginx/sites-available/app.conf /etc/nginx/sites-available/

# Create symbolic link
RUN mkdir -p /etc/nginx/sites-enabled
RUN ln -s /etc/nginx/sites-available/app.conf /etc/nginx/sites-enabled/

# Copy aplikasi dari builder ke lokasi serve
RUN mkdir -p /var/www/client
COPY --from=builder /app/dist /var/www/client

# Buka port untuk akses nginx
EXPOSE 80

# Jalankan nginx di foreground
CMD [ "nginx", "-g", "daemon off;" ]