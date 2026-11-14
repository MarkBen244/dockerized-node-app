
# Dockerized Node.js Task Manager

## About the Project

A simple task management web application built with Node.js, Express.js, and PostgreSQL. The application is containerized using Docker and Docker Compose.

The project demonstrates how to connect a frontend, backend API, and relational database in a containerized environment.

## Technologies Used

- **Node.js** – JavaScript runtime
- **Express.js** – Backend web framework
- **PostgreSQL** – Relational database
- **Docker** – Application containerization
- **Docker Compose** – Multi-container orchestration
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

## Project Structure

```text
dockerized-node-app/
├── database/
│   └── init.sql
├── public/
│   ├── index.html
│   ├── style.css
│   └── app.js
├── src/
│   ├── db.js
│   └── server.js
├── .dockerignore
├── .gitignore
├── Dockerfile
├── compose.yaml
├── package.json
└── package-lock.json
```

## Getting Started

### Prerequisites

- Node.js
- Docker Desktop
- Git

### Installation

1. Clone the repository:

```bash
git clone https://github.com/MarkBen244/dockerized-node-app.git
```

2. Navigate into the project directory:

```bash
cd dockerized-node-app
```

3. Build and start the application:

```bash
docker compose up -d --build
```

4. Open the application in your browser:

```text
http://localhost:3000
```

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

## Stopping the Application

To stop the containers:

```bash
docker compose down
```

The named database volume is preserved when using this command.

## What I Learned

- Building a backend application with Node.js and Express.js
- Connecting an application to PostgreSQL
- Creating REST API endpoints
- Writing a Dockerfile
- Containerizing an application
- Managing multiple containers with Docker Compose
- Configuring container networking
- Using Docker volumes for database persistence
- Managing source code with Git and GitHub

## Author

**Mark Bernard**

GitHub: [MarkBen244](https://github.com/MarkBen244)
