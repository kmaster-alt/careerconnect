# CareerConnect

CareerConnect is a web application that helps users find remote job opportunities easily. Users can search for jobs by keyword, filter jobs by category, and sort job results alphabetically.

## Live Demo

http://3.83.235.8

## Features

- Search remote jobs by keyword (press Enter or click Search)
- Filter jobs by category
- Sort jobs from A-Z and Z-A (works together with the category filter)
- Responsive design for different devices
- Displays job title, company, location, category, and application link
- Handles API errors with user-friendly messages
- Shows loading messages while fetching jobs

## API Used

CareerConnect uses the Remotive Remote Jobs API.

API Endpoint:

https://remotive.com/api/remote-jobs

The API provides remote job listings from different companies around the world.

No API key is required.

Credit:

Remotive API  
https://remotive.com/

## API Key / Credentials

This project does not require any API key, login, or credentials to run. The Remotive API is public and free to use with no authentication.

## Technologies Used

- HTML
- CSS
- JavaScript
- Fetch API
- Nginx
- HAProxy

## Running Locally

1. Clone the repository:

```bash
git clone git@github.com:kmaster-alt/careerconnect.git
```

2. Navigate into the project folder:

```bash
cd careerconnect
```

3. Open `index.html` in your browser.

The application will run locally.

## Application Usage

Users can:

1. Enter a keyword to search for remote jobs.
2. Filter jobs by category.
3. Sort jobs alphabetically.
4. Click Apply to view job details.

## Error Handling

The application handles:

- API connection failures
- Invalid API responses
- Empty search results

Users receive clear error messages instead of the application crashing.

## Project Structure

```
careerconnect/
│
├── index.html
├── style.css
├── script.js
├── README.md
└── .gitignore
```

# Deployment

CareerConnect was deployed on the provided web infrastructure using two web servers and one load balancer.

## Web Servers

### Web01

IP Address: 44.212.4.142

### Web02

IP Address: 44.205.246.49

The application files were copied to both servers and hosted using Nginx.

Deployment commands:

```bash
scp -r . ubuntu@44.212.4.142:/tmp/careerconnect

scp -r . ubuntu@44.205.246.49:/tmp/careerconnect
```

The files were moved to the Nginx web directory:

```bash
sudo cp -r /tmp/careerconnect/* /var/www/html/
```

Nginx was restarted:

```bash
sudo systemctl restart nginx
```

> Note: For subsequent updates, individual files (e.g. `script.js`) were copied directly to `/tmp/` on each server and then moved into `/var/www/html/`, without restarting Nginx (not required for static file changes).

# Load Balancer Configuration

HAProxy was configured on the load balancer server to distribute traffic between Web01 and Web02.

## Load Balancer

Lb01:

```
3.83.235.8
```

HAProxy configuration:

```text
frontend careerconnect_front
    bind *:80
    mode http
    default_backend careerconnect_servers

backend careerconnect_servers
    mode http
    balance roundrobin
    server web01 44.212.4.142:80 check
    server web02 44.205.246.49:80 check
```

Traffic is distributed using the round-robin algorithm.

The application is accessible through:

```
http://3.83.235.8
```

# Testing

The application was tested by:

- Opening the website directly from Web01.
- Opening the website directly from Web02.
- Accessing the application through the load balancer.
- Confirming HAProxy forwards traffic correctly.

# Challenges

Challenges faced during development:

- Integrating an external API.
- Handling API failures.
- Deploying the application on multiple servers.
- Configuring HAProxy.

These challenges were solved through testing, debugging, and documentation research.

# Demo Video

YouTube Demo Link:



# GitHub Repository

https://github.com/kmaster-alt/careerconnect