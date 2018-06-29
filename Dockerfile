#==================== Building Stage ================================================

# Create the image based on the official Node 8.9.0 image from Dockerhub
FROM node:8.11.3

# Create a directory where our app will be placed. This might not be necessary
RUN mkdir -p /vdf_vue

# Change directory so that our commands run inside this new directory
WORKDIR /vdf_vue

# Copy dependency definitions
COPY package.json /vdf_vue

# Install dependencies using npm
RUN npm install

# Get all the code needed to run the app
COPY . /vdf_vue

# Expose the port the app runs in
EXPOSE 80

#Build the app
RUN npm run build

#==================== Setting up stage ====================

# Create image based on the official nginx - Alpine image
FROM nginx

COPY --from=node /vdf_vue/dist/ /usr/share/nginx/html

COPY ./nginx.conf /etc/nginx/conf.d/default.conf
