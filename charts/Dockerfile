# Base image with Node.js and Yarn
FROM node:16-alpine AS base

# Set the working directory in the container
WORKDIR /app

# Copy package files for dependency installation
COPY package.json yarn.lock ./

# Install project dependencies
RUN yarn install

# Build the production-ready React app
FROM base AS build

# Copy the project files to the container
COPY . .

# Build the React app
RUN yarn build

# Use a lightweight web server for serving the built app
FROM nginx:alpine AS release

# Copy the built React app from the previous stage
COPY --from=build /app/build /usr/share/nginx/html

# Expose the default port for HTTP traffic
EXPOSE 80

# Start the nginx server
CMD ["nginx", "-g", "daemon off;"]