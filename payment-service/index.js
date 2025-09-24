const { Kafka } = require('kafkajs');

const kafka = new Kafka({ clientId: 'payment-service', brokers: [process.env.KAFKA_BROKER || 'kafka:9092'] });
const consumer = kafka.consumer({ groupId: 'payment-group' });
const producer = kafka.producer();

async function run() {
  await consumer.connect();
  await producer.connect();
  await consumer.subscribe({ topic: 'order.created', fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ message }) => {
      const order = JSON.parse(message.value.toString());
      console.log('Processing payment for order:', order.id);

      await new Promise(r => setTimeout(r, 1000)); // simulate payment delay

      await producer.send({
        topic: 'payment.completed',
        messages: [{ value: JSON.stringify({ orderId: order.id, status: 'paid' }) }]
      });

      console.log('Payment completed for order:', order.id);
    }
  });
}

run().catch(console.error);
