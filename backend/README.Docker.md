### Building and running your application

When you're ready, start your application by running:
`docker compose up --build`.

Your application will be available at http://localhost:3001.

### Deploying your application to the cloud

First, build your image, e.g.: `docker build -t myapp .`.
If your cloud uses a different CPU architecture than your development
machine (e.g., you are on a Mac M1 and your cloud provider is amd64),
you'll want to build the image for that platform, e.g.:
`docker build --platform=linux/amd64 -t myapp .`.

Then, push it to your registry, e.g. `docker push myregistry.com/myapp`.

Consult Docker's [getting started](https://docs.docker.com/go/get-started-sharing/)
docs for more detail on building and pushing.

### References
* [Docker's Node.js guide](https://docs.docker.com/language/nodejs/)

# Deploying to Amazon EC2

This guide explains how to deploy this Node.js application to Amazon EC2 using Docker.

## Prerequisites

- An AWS account with access to EC2
- Basic knowledge of AWS EC2
- Docker and Docker Compose installed on your EC2 instance

## Setup EC2 Instance

1. Launch an EC2 instance (recommended: t2.micro or larger with Amazon Linux 2)
2. Configure security groups to allow:
   - SSH (port 22)
   - HTTP (port 80)
   - HTTPS (port 443)
   - Application port (3001)

## Install Docker on EC2

Connect to your EC2 instance and run:

```bash
# Update packages
sudo yum update -y

# Install Docker
sudo amazon-linux-extras install docker -y
sudo service docker start
sudo systemctl enable docker
sudo usermod -a -G docker ec2-user

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Log out and log back in to apply group changes
```

## Deploy the Application

1. Clone your repository to the EC2 instance:
   ```bash
   git clone <your-repository-url>
   cd <repository-directory>
   ```

2. Create a `.env` file with your production environment variables:
   ```bash
   cp .env.production .env
   # Edit the .env file with your production values
   ```

3. Run the deployment script:
   ```bash
   ./deploy.sh
   ```

## Setup Automatic Deployment (Optional)

For automatic deployment with GitHub Actions:

1. Create GitHub secrets for your AWS credentials
2. Set up a workflow that deploys to EC2 on push to main branch

## Monitoring and Maintenance

- View logs: `docker-compose logs -f`
- Restart services: `docker-compose restart`
- Update application: `./deploy.sh`

## Backup Strategy

- Database backups: Configure regular PostgreSQL dumps
- Set up AWS S3 for storing backups

## Troubleshooting

- Check container status: `docker-compose ps`
- Check container logs: `docker-compose logs -f [service-name]`
- Restart specific service: `docker-compose restart [service-name]`

## Security Considerations

- Use strong passwords in your .env file
- Consider using AWS Secrets Manager for sensitive data
- Keep your EC2 instance and Docker images updated