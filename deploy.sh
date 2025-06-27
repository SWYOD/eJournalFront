#!/bin/bash

# eJournal Deployment Script
# This script should be run on your server (85.198.82.172)

set -e

echo "🚀 Starting eJournal deployment..."

# Configuration
HARBOR_REGISTRY="harbor.pixelservices.ru"
HARBOR_USERNAME="ilya"
PROJECT_NAME="ejournal"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    print_error "Docker is not installed. Please install Docker first."
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    print_error "Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

# Create application directory
print_status "Creating application directory..."
mkdir -p /opt/ejournal
cd /opt/ejournal

# Create docker network if it doesn't exist
print_status "Creating Docker network..."
docker network create ejournal-network 2>/dev/null || true

# Create necessary directories
print_status "Creating required directories..."
mkdir -p nginx/ssl
mkdir -p data/postgres
mkdir -p logs

# Login to Harbor registry
print_status "Logging into Harbor registry..."
echo "Please enter Harbor password:"
read -s HARBOR_PASSWORD
echo "$HARBOR_PASSWORD" | docker login $HARBOR_REGISTRY -u $HARBOR_USERNAME --password-stdin

# Pull latest images
print_status "Pulling latest Docker images..."
docker pull $HARBOR_REGISTRY/$PROJECT_NAME/frontend:latest
docker pull $HARBOR_REGISTRY/$PROJECT_NAME/backend:latest

# Check if .env file exists
if [ ! -f .env ]; then
    print_warning ".env file not found. Creating from template..."
    cat > .env << 'EOF'
# Database
POSTGRES_PASSWORD=change_this_password

# JWT
JWT_SECRET=change_this_jwt_secret

# AWS S3 Configuration
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_REGION=us-east-1
AWS_S3_BUCKET=your_bucket_name
EOF
    print_warning "Please edit .env file with your actual configuration before continuing."
    read -p "Press Enter after you've updated the .env file..."
fi

# Create docker-compose.yml if it doesn't exist
if [ ! -f docker-compose.yml ]; then
    print_status "Creating docker-compose.yml..."
    # You would copy the docker-compose.yml content here
    print_warning "Please ensure docker-compose.yml is properly configured."
fi

# Stop existing containers
print_status "Stopping existing containers..."
docker-compose down || true

# Start services
print_status "Starting services..."
docker-compose up -d

# Wait for services to be healthy
print_status "Waiting for services to be ready..."
sleep 30

# Check service status
print_status "Checking service status..."
docker-compose ps

# Test connectivity
print_status "Testing service connectivity..."
if curl -f http://localhost/health > /dev/null 2>&1; then
    print_status "✅ Services are running and healthy!"
else
    print_warning "⚠️  Services may not be fully ready yet. Check logs with: docker-compose logs"
fi

# Show useful commands
echo ""
echo "🎉 Deployment completed!"
echo ""
echo "Useful commands:"
echo "  View logs: docker-compose logs -f"
echo "  Restart services: docker-compose restart"
echo "  Stop services: docker-compose down"
echo "  Update services: docker-compose pull && docker-compose up -d"
echo ""
echo "Your application should be available at:"
echo "  Frontend: http://$(hostname -I | awk '{print $1}')"
echo "  Backend API: http://$(hostname -I | awk '{print $1}')/api"
