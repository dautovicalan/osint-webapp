# PTBOX

## Description

This is an Open Source Intelligence (OSINT) Basic Application built using React for the frontend and Python Flask for the backend. The project structure is organized into separate folders for the frontend (front) and backend (back). This modular design allows for independent development, testing, and deployment of each component.

The frontend presents a user-friendly interface for interacting with the application, while the backend handles data processing, communication with external services, and database operations.

Features:

- Frontend: Built with React, providing a responsive and intuitive user interface for conducting OSINT scans.
- Backend: Powered by Python Flask, handling data processing, API requests, and interaction with external services.
- Database: The application is connected to a MongoDB Atlas cluster, where scan results are securely stored and can be accessed at any time.
- Dockerization: Can be easily deployed as Docker containers, simplifying the setup process and ensuring consistency across different environments.

# Installation

To install App, follow these steps:

### 1. Clone the project

```console
git clone https://github.com/dautovicalan/osint-webapp.git
```

### 2. Navigate to back folder and build Docker image

```console
docker build -t ptbox-backend .
```

### 3. Run Docker container for backend, exposing port 8000

```console
docker run -p 8000:8000 ptbox-backend
```

### 4. Navigate to front folder and build Docker image

```console
docker build -t ptbox-frontend .
```

### 5. Run Docker container for frontend, exposing port 8080

```console
docker run -p 8080:8080 ptbox-frontend
```

### 6. Open the app in browser

```console
http://localhost:8080/harvester
```
