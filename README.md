# Nawy Apartment Listings Application

Full-stack application for browsing apartment listings built with Next.js, Express, and MongoDB.

## Prerequisites

- Docker
- Docker Compose

## Running the Application

```bash
# Build and start all services (first time or after code changes)
docker-compose up --build

# Start services using existing images (subsequent runs)
docker-compose up

# Or run in detached mode
docker-compose up --build -d
docker-compose up -d
```

### When to use --build flag:
- First time running the application
- After making changes to code or Dockerfiles
- When you want to ensure you have the latest versions of your images

## Services

- **MongoDB**: Database running on port 27017
- **Backend**: Express API running on http://localhost:9876/api
- **Frontend**: Next.js application running on http://localhost:3000

## Stopping the Application

```bash
# Stop all services
docker-compose down

# Remove volumes (deletes database data)
docker-compose down -v
```
