const express = require('express');
const bodyParser = require('body-parser');
const { Kafka } = require('kafkajs');

const app = express();
app.use(bodyParser.json());

const kafka = new Kafka({ clientId: 'order-service', brokers: [process.env.KAFKA_BROKER || 'kafka:9092'] });
const producer = kafka.producer();

async function start() {
  await producer.connect();

  app.post('/order', async (req, res) => {
    const order = req.body;
    try {
      await producer.send({
        topic: 'order.created',
        messages: [{ value: JSON.stringify(order) }]
      });
      res.status(201).json({ status: 'order received', order });
    } catch (error) {
      console.error('Error sending order:', error);
      res.status(500).json({ status: 'error', message: error.message });
    }
  });

  const port = process.env.PORT || 3001;
  app.listen(port, () => console.log(`Order service running on port ${port}`));
}

start().catch(console.error);
