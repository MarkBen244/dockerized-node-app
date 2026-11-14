# Dockerized Node.js Task Manager

## About the Project

A task management web application built with Node.js, Express.js, and PostgreSQL. The application is containerized using Docker and Docker Compose.

The project demonstrates how to integrate a frontend, backend API, and relational database in a containerized environment. It also demonstrates DevOps practices, including automated testing, CI/CD, Docker image publishing, deployment, and application monitoring.

## Technologies Used

- **Node.js** – JavaScript runtime
- **Express.js** – Backend web framework
- **PostgreSQL** – Relational database
- **Docker** – Application containerization
- **Docker Compose** – Multi-container orchestration
- **Jest** – Automated testing framework
- **Supertest** – HTTP API testing
- **Morgan** – HTTP request logging
- **GitHub Actions** – CI/CD automation
- **Docker Hub** – Docker image repository
- **HTML, CSS, JavaScript** – Frontend development
- **Git and GitHub** – Version control and source code management

## Features

- View all tasks
- Create new tasks
- Mark tasks as completed or pending
- Delete tasks
- Store tasks in PostgreSQL
- Serve the frontend through the Express.js backend
- Run the application and database using Docker Compose
- Automated API testing
- Automated Docker image building
- Automated Docker Hub publishing
- Application and database health checks
- HTTP request logging

## Project Structure

```text
dockerized-node-app/
├── .github/
│   └── workflows/
│       └── ci.yml
├── database/
│   └── init.sql
├── public/
│   ├── index.html
│   ├── style.css
│   └── app.js
├── src/
│   ├── db.js
│   └── server.js
├── test/
│   └── server.test.js
├── .dockerignore
├── .gitignore
├── Dockerfile
├── compose.yaml
├── package.json
├── package-lock.json
└── README.md
```

## Getting Started

### Prerequisites

- Docker Desktop
- Git
- Node.js and npm (for running tests locally)

### Installation and Deployment

1. Clone the repository:

```bash
git clone https://github.com/MarkBen244/dockerized-node-app.git
```

2. Navigate into the project directory:

```bash
cd dockerized-node-app
```

3. Pull the published application image from Docker Hub:

```bash
docker compose pull app
```

4. Start the application and database:

```bash
docker compose up -d
```

5. Open the application in your browser:

```text
http://localhost:3000
```

The application image is published at:

**Docker Hub:** https://hub.docker.com/r/bernardmark1/dockerized-node-app

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/health` | Application health check |
| GET | `/db-health` | Database connection check |
| GET | `/tasks` | Retrieve all tasks |
| POST | `/tasks` | Create a task |
| PATCH | `/tasks/:id` | Update task completion |
| DELETE | `/tasks/:id` | Delete a task |

## Database

The application uses PostgreSQL to store task information.

The database table is initialized using:

`database/init.sql`

Docker Compose manages the application and database containers, while a named Docker volume provides persistent database storage.

## Automated Testing

The project uses Jest and Supertest to test its API endpoints.

Run the tests locally using:

```bash
npm test
```

The test suite contains 9 automated tests covering:

- Application health checks
- Retrieving tasks
- Creating tasks
- Validating task input
- Updating task completion
- Deleting tasks
- Handling unsuccessful requests

All 9 tests passed during project verification.

## CI/CD Pipeline

GitHub Actions automates the project's testing and Docker image publishing process.

The workflow is triggered by pushes and pull requests targeting the `main` branch.

### Pipeline Stages

1. **Checkout:** Retrieves the source code from GitHub.
2. **Setup:** Configures the Node.js environment.
3. **Install:** Installs dependencies using `npm ci`.
4. **Test:** Runs automated tests using Jest.
5. **Build:** Builds the Docker image.
6. **Publish:** Logs in to Docker Hub and publishes the image.

Docker image publishing only occurs when changes are pushed to the `main` branch.

Docker Hub credentials are securely stored as GitHub repository secrets.

## Deployment

The application is deployed locally using Docker Compose and the published Docker Hub image.

To retrieve the latest image:

```bash
docker compose pull app
```

To deploy or update the running application:

```bash
docker compose up -d
```

To verify the deployment:

```bash
docker compose ps
```

The application runs on port `3000`, while PostgreSQL runs in its own container.

This project demonstrates image-based deployment in a local Docker environment. It does not use an always-on cloud production server.

## Monitoring and Observability

The project implements basic monitoring using Docker health checks and application logging.

### Application Health Check

Docker periodically checks the application's `/health` endpoint.

### Database Health Check

PostgreSQL uses `pg_isready` to verify database availability.

### Application Logs

Docker Compose provides access to application logs:

```bash
docker compose logs --tail=50 app
```

To monitor logs continuously:

```bash
docker compose logs -f app
```

### HTTP Request Logging

Morgan middleware records incoming HTTP requests, including:

- HTTP method
- Requested URL
- Response status code
- Response time

### Health Check Commands

Check application health:

```powershell
Invoke-RestMethod http://localhost:3000/health
```

Check database connectivity:

```powershell
Invoke-RestMethod http://localhost:3000/db-health
```

Check container status:

```bash
docker compose ps
```

## Stopping the Application

To stop the containers:

```bash
docker compose down
```

The named database volume is preserved when using this command.

**Note:** Avoid `docker compose down -v` unless you intentionally want to delete the persistent database volume and its data.

## What I Learned

- Building backend applications with Node.js and Express.js
- Creating and testing REST API endpoints
- Connecting applications to PostgreSQL
- Writing Dockerfiles
- Containerizing applications
- Managing multiple containers with Docker Compose
- Configuring container networking
- Using Docker volumes for database persistence
- Writing automated tests with Jest and Supertest
- Creating CI/CD pipelines with GitHub Actions
- Automating Docker image builds and publishing
- Deploying applications using Docker Hub images
- Implementing container health checks
- Monitoring application logs and HTTP requests
- Managing source code with Git and GitHub

## Author

**Mark Bernard**

GitHub: https://github.com/MarkBen244
