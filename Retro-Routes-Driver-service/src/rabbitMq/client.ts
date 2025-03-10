import { Channel, Connection, connect } from "amqplib";
import rabbitMq from "../config/rabbitMq";
import Consumer from './consumer'
import Producer from './producer'

class RabbitMQClient {
    private constructor() {}
    private static instance: RabbitMQClient;
    private isInitialized = false;
  
    private producer: Producer | undefined;
    private consumer: Consumer | undefined;
    private connection: Connection | undefined;
    private producerChannel: Channel | undefined;
    private consumerChannel: Channel | undefined;

    public static getInstance() {
        if (!this.instance) {
          this.instance = new RabbitMQClient();
        }
        return this.instance;
    }

    async initialize() {
        if (this.isInitialized) {
          return;
        }
        try {
            this.connection = await connect(rabbitMq.rabbitMQ.url);
      
            const [producerChannel, consumerChannel] = await Promise.all([
              this.connection.createChannel(),
              this.connection.createChannel()
            ]);
      
            this.producerChannel = producerChannel;
            this.consumerChannel = consumerChannel;
      
            const { queue: rpcQueue } = await this.consumerChannel.assertQueue(
              rabbitMq.queues.driverQueue,
              { exclusive: true }
            );
      
            this.producer = new Producer(this.producerChannel);
            this.consumer = new Consumer(this.consumerChannel, rpcQueue);
      
            this.consumer.consumeMessages();
      
            this.isInitialized = true;
          } catch (error) {
            console.log("rabbitmq error...", error);
          }
    }

    async produce(data: any, correlationId: string, replyToQueue: string) {
        if (!this.isInitialized) {
          await this.initialize();
        }
        return await this.producer?.produceMessages(
          data,
          correlationId,
          replyToQueue
        );
      }
  
}

export default RabbitMQClient.getInstance();