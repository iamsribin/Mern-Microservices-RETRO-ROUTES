import 'dotenv/config'

export default {
    rabbitMQ: {
      url: String(process.env.RABBITMQ_URL),
    },
    queues: {
        driverQueue: "drivers_queue",
      }
  };