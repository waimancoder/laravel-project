# Laravel and Next.js Project with Docker

This project is a full-stack web application built with Laravel for the backend API and Next.js for the frontend. The development environment is set up using Docker.

## Requirements

-   Docker
-   Docker Compose

## Setup

1. Clone the repository:

```zsh
git clone https://github.com/waimancoder/laravel-project.git
cd laravel-project
```

2. Build and start the Docker containers:

```zsh
docker-compose up --build -d
```

This command will build and run the Docker containers in the background. The Laravel API will be accessible at **http://api.localhost** and the Next.js frontend at **http://localhost**.
