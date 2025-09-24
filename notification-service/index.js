const { Kafka } = require('kafkajs');

const kafka = new Kafka({ clientId: 'notification-service', brokers: [process.env.KAFKA_BROKER || 'kafka:9092'] });
const consumer = kafka.consumer({ groupId: 'notif-group' });

async function run() {
  await consumer.connect();
  await consumer.subscribe({ topic: 'payment.completed', fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ message }) => {
      const event = JSON.parse(message.value.toString());
      console.log(`Notification: Order ${event.orderId} has status ${event.status}`);
    }
  });
}

run().catch(console.error);
