# Nawy Apartment Listings Application

Full-stack application for browsing apartment listings built with Next.js, Express, and MongoDB.

## Prerequisites

- Docker
- Docker Compose

## Running the Application

Build and start all services (first time or after code changes):
```bash
docker-compose up --build
```

Start services using existing images (subsequent runs):
```bash
docker-compose up
```

Run in detached mode (first time or after code changes):
```bash
docker-compose up --build -d
```

Run in detached mode (subsequent runs):
```bash
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

Stop all services:
```bash
docker-compose down
```

Remove volumes (deletes database data):
```bash
docker-compose down -v
```