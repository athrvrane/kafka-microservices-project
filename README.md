# Kafka Microservices Project

This project demonstrates a microservices architecture using Kafka, Node.js, and Docker Compose. It includes three services: order-service, payment-service, and notification-service, communicating asynchronously via Kafka topics.

## Features

- Dockerized Kafka broker and Zookeeper
- Asynchronous order processing and payment handling
- Kafka consumer groups for scalable messaging
- REST API to create orders

---- Getting Started ----

### Prerequisites

- Docker & Docker Compose installed
- Git installed

### Running the Project

1. Clone the repository:
git clone https://github.com/yourusername/yourrepo.git
cd yourrepo

2. Start services using Docker Compose:
cmd: docker-compose up --build

3. Create required Kafka topics (only once or if missing):
docker exec -it <kafka_container_name> kafka-topics --create --topic order.created --partitions 1 --replication-factor 1 --bootstrap-server kafka:9092
docker exec -it <kafka_container_name> kafka-topics --create --topic payment.completed --partitions 1 --replication-factor 1 --bootstrap-server kafka:9092

4. Use Postman or curl to test the order service:
POST http://localhost:3001/order
Content-Type: application/json

paste:
Sample JSON body:
{
"id": "1",
"item": "book",
"quantity": 1
}

5. Monitor logs of payment-service and notification-service for order processing and notifications.

### Stopping the Project

cmd: docker-compose down

You can customize yourusername/yourrepo and <kafka_container_name> accordingly
