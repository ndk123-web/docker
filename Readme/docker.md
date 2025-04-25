# Node.js Docker Setup

This project demonstrates how to containerize a Node.js application using Docker. The provided `Dockerfile` is optimized for development and includes `nodemon` for live reloading.

---

## Table of Contents
1. [Dockerfile Overview](#dockerfile-overview)
2. [Prerequisites](#prerequisites)
3. [Building the Docker Image](#building-the-docker-image)
4. [Running the Container](#running-the-container)
5. [Development Workflow](#development-workflow)
6. [Troubleshooting](#troubleshooting)

---

## Dockerfile Overview

The `Dockerfile` is designed to:
1. Use the official Node.js 18 image as the base.
2. Set up a working directory inside the container (`/app`).
3. Install dependencies using `npm`.
4. Install `nodemon` globally for live reloading during development.
5. Copy the application code into the container.
6. Start the application using `nodemon`.

### Key Instructions in the Dockerfile
- **Base Image**: `node:18` is used as the base image.
- **Working Directory**: The application files are placed in `/app` inside the container.
- **Layer Caching**: Package files (`package.json` and `package-lock.json`) are copied first to leverage Docker's layer caching for dependencies.
- **Live Reloading**: `nodemon` is installed globally to enable live reloading during development.

---

## Prerequisites

Before using this setup, ensure the following are installed on your system:
1. **Docker**: [Install Docker](https://docs.docker.com/get-docker/)
2. **Node.js**: (Optional) For local development outside the container.

---

## Building the Docker Image

To build the Docker image, run the following command in the terminal:

```sh
docker build -t mynodeapp .
```

- `-t mynodeapp`: Tags the image with the name `mynodeapp`.
- `.`: Specifies the current directory as the build context.

---

## Running the Container

To run the container, use the following command:

```sh
docker run -p 3000:3000 --name mynodeapp-container mynodeapp
```

- `-p 3000:3000`: Maps port `3000` on the host to port `3000` in the container.
- `--name mynodeapp-container`: Names the container `mynodeapp-container`.
- `mynodeapp`: Specifies the image to use.

---

## Development Workflow

### Live Code Changes
The `Dockerfile` is optimized for development. To enable live code changes:
1. Mount the current directory to `/app` in the container using the `-v` flag:
   ```sh
   docker run -p 3000:3000 -v ${PWD}:/app --name mynodeapp-container mynodeapp
   ```
2. `nodemon` will automatically restart the application when changes are detected.

---

## Troubleshooting

### Common Issues
1. **Port Conflicts**: If port `3000` is already in use, change the host port in the `-p` flag:
   ```sh
   docker run -p 8080:3000 --name mynodeapp-container mynodeapp
   ```
2. **Permission Issues**: Ensure you have the necessary permissions to run Docker commands.

### Debugging Tips
- Use `docker ps` to check running containers.
- Use `docker logs <container_name>` to view logs for a specific container.
- Use `docker exec -it <container_name> sh` to open a shell inside the running container.

---