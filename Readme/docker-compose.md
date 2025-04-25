# Docker Compose Setup for Node.js and MongoDB

This project demonstrates how to set up a Node.js application with MongoDB using Docker and Docker Compose. Below is a detailed explanation of the `docker-compose.yml` file and the commands you can use to manage the setup.

---

## Table of Contents
1. [Project Overview](#project-overview)
2. [Services](#services)
   - [Node.js Service (`mynodeapp`)](#nodejs-service-mynodeapp)
   - [MongoDB Service (`mymongodb`)](#mongodb-service-mymongodb)
3. [Networks](#networks)
4. [Volumes](#volumes)
5. [Docker Compose Commands](#docker-compose-commands)

---

## Project Overview

This project uses Docker Compose to orchestrate two services:
1. A Node.js application (`mynodeapp`) that runs on port `3000`.
2. A MongoDB database (`mymongodb`) that runs on port `27017`.

The services are connected via a custom Docker network (`mynetwork`) and use Docker volumes to persist data.

---

## Services

### Node.js Service (`mynodeapp`)

- **Build Context**: The service uses the `Dockerfile` in the current directory to build the image.
- **Container Name**: `mynodeyml`
- **Ports**: Maps port `3000` on the host to port `3000` in the container.
- **Volumes**: Mounts the current directory (`.`) to `/app` in the container. This allows live code changes during development.
- **Networks**: Connected to the `mynetwork` network for communication with other services.
- **Depends On**: The service depends on the MongoDB service (`mymongodb`) to ensure MongoDB starts first.
- **Command**: Runs the application using `nodemon` to enable live reloading.

### MongoDB Service (`mymongodb`)

- **Image**: Uses the official `mongo:latest` image.
- **Container Name**: `mymongodb`
- **Ports**: Maps port `27017` on the host to port `27017` in the container.
- **Volumes**: Uses a named volume (`mongo-data`) to persist MongoDB data.
- **Networks**: Connected to the `mynetwork` network for communication with the Node.js service.

---

## Networks

- **Name**: `mynetwork`
- **Driver**: `bridge`
- **Purpose**: Allows the Node.js and MongoDB services to communicate with each other using container names.

---

## Volumes

- **Name**: `mongo-data`
- **Driver**: `local`
- **Purpose**: Persists MongoDB data on the host machine, ensuring data is not lost when the container is removed or recreated.

---

## Docker Compose Commands

Here are the essential Docker Compose commands to manage this setup:

### 1. Build the Services
```sh
docker-compose build
```

### 2. Start the Services
```sh
docker-compose up
```
This command starts all the services defined in the `docker-compose.yml` file. Use the `-d` flag to run the services in detached mode:
```sh
docker-compose up -d
```

### 3. Stop the Services
```sh
docker-compose down
```
This stops and removes all the containers, networks, and volumes created by `docker-compose up`.

### 4. View Logs
```sh
docker-compose logs
```
Use the `-f` flag to follow the logs in real-time:
```sh
docker-compose logs -f
```

### 5. Restart the Services
```sh
docker-compose restart
```

### 6. Execute Commands in a Running Container
To execute a command inside a running container, use:
```sh
docker-compose exec <service_name> <command>
```
For example, to open a shell in the Node.js container:
```sh
docker-compose exec mynodeapp sh
```

### 7. Remove All Containers, Networks, and Volumes
To clean up everything created by Docker Compose:
```sh
docker-compose down --volumes
```

---

## Additional Notes

- Ensure Docker and Docker Compose are installed on your system before running these commands.
- Modify the `docker-compose.yml` file as needed to suit your project requirements.
- Use `.env` files to manage environment variables securely.

---

## Troubleshooting

### Common Issues
1. **Port Conflicts**: If the ports `3000` or `27017` are already in use, update the `docker-compose.yml` file to use different ports.
2. **Permission Issues**: Ensure you have the necessary permissions to run Docker commands.
3. **Volume Issues**: If you encounter issues with volumes, try removing the volume using:
   ```sh
   docker volume rm mongo-data
   ```

### Debugging Tips
- Use `docker ps` to check the status of running containers.
- Use `docker logs <container_name>` to view logs for a specific container.

---

## Conclusion

This setup provides a robust starting point for developing a Node.js application with MongoDB using Docker Compose.