# Nawy Apartment Listings Application

Full-stack application for browsing apartment listings built with Next.js, Express, and MongoDB.

## Prerequisites

- Docker
- Docker Compose

## Setup Instructions

1. Clone the repository:
```bash
git clone https://github.com/MohamedAMAH/Nawy-Assignment-App.git
```

2. Navigate to the project directory:
```bash
cd Nawy-Assignment-App
```

3. Build and start all services (first time or after code changes):
```bash
docker-compose up --build
```

4. For subsequent runs, start services using existing images:
```bash
docker-compose up
```

5. Alternatively, run in detached mode:
```bash
docker-compose up --build -d
```

6. Or for subsequent runs in detached mode:
```bash
docker-compose up -d
```

7. Wait for all services to start (you should see logs from all containers)

8. Open your browser and navigate to:
```
http://localhost:3000
```

### When to use --build flag:
- First time running the application
- After making changes to code or Dockerfiles
- When you want to ensure you have the latest versions of your images

## Services

- **MongoDB**: Database running on port 27017
- **Backend**: Express API running on http://localhost:9876/api
- **Frontend**: Next.js application running on http://localhost:3000

## Usage

The application will automatically:
- Set up the MongoDB database
- Seed the database with 5 sample apartments
- Start the backend API server
- Start the frontend Next.js application

You can then:
- Browse apartment listings on the homepage
- View detailed apartment information
- Filter and search through available properties
- Create a new apartment

## Stopping the Application

Stop all services:
```bash
docker-compose down
```

Remove volumes (deletes database data):
```bash
docker-compose down -v
```