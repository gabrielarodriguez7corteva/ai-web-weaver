# Stage 1: Build the React application
FROM node:20-alpine AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application source code
COPY . .

# IMPORTANT: Pass the API key from the build command as an argument
ARG API_KEY
# Set it as an environment variable for the build process
ENV VITE_API_KEY=$API_KEY

# Build the app for production
RUN npm run build

# Stage 2: Serve the application with Nginx
FROM nginx:stable-alpine

# Copy the built static files from the 'build' stage
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# The default nginx command will start the server
CMD ["nginx", "-g", "daemon off;"]