import { Channel, ConsumeMessage } from "amqplib";
import MessageHandler from './messageHandler'

export default class Consumer {
  constructor(private channel: Channel, private rpcQueue: string) {}

  async consumeMessages() {
    console.log("Ready to consume-order messages...");

    this.channel.consume(this.rpcQueue, async (message: ConsumeMessage | null) => {
        console.log("consumewe");
        
      if (message) {
        if (message.properties) {
          const { correlationId, replyTo } = message.properties;
          const operation = message.properties.headers?.function ;
          if (!correlationId || !replyTo) {
            console.log("Missing some properties...");
          }
         
        if (message.content) { 
          await MessageHandler.handle(
            operation,
            JSON.parse(message.content.toString()),
            correlationId,
            replyTo
          );
        } else {
          console.log("Received message content is null or undefined.");
        }    
      } else {
        console.log("Received message is null.");
      }
    }else{
        console.log("missing message properties ");
    }
    },{ noAck : true});
  }
}