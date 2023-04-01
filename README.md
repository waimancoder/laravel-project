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

However, to access **api.localhost** on your local machine, you need to update your /etc/hosts file to map the subdomain to 127.0.0.1.

Open your /etc/hosts file with administrator privileges and add the following line:

```zsh
127.0.0.1       api.localhost
```

Save the file and restart your Docker containers after updating the Nginx configuration:

Now, you should be able to access your Laravel API at **http://api.localhost** and your Next.js application at **http://localhost**.

# Development

## Laravel API

The Laravel API is located in the root directory of the repository. To run migrations and execute artisan commands, you can use **docker-compose exec**:

```zsh
docker-compose exec app php artisan migrate
```

## Next.js Frontend

The Next.js frontend is located in the frontend directory. To install dependencies and run development tasks, you can use **docker-compose exec**:

```zsh
docker-compose exec react npm install
docker-compose exec react npm run dev
```

# Production

To build the production version of the Next.js frontend, run:

```zsh
docker-compose exec react npm run build
```

The production build will be available in the frontend/build directory and served by the Nginx web server.
