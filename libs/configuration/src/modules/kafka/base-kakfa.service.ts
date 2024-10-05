import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { LoggerService } from '@shared-modules/logger/logger.service';
import { assert } from 'console';
import { Kafka } from 'kafkajs';

@Injectable()
export class KafkaService {
  private kafka: Kafka;
  private readonly kafkaClientId: string;
  private readonly kafkaGroupId: string;
  constructor(private configService: ConfigService, private readonly loggerService: LoggerService) {
    this.kafkaClientId = 'client-1' + Date.now();
    this.kafkaGroupId = 'group-1';

    this.kafka = new Kafka({
      clientId: this.kafkaClientId,
      brokers: ['localhost:9092'],
    });
  }
  private logger = this.loggerService.getLogger('KAFKA_SERVICE');
  async sendMessage<T>(topic: string, message: T) {
    assert(typeof message === 'object', 'only support object as raw message.');
    const producer = this.kafka.producer({
      idempotent: true,
    });
    await producer.connect();
    const res = await producer.send({
      topic,
      messages: [{ value: JSON.stringify(message) }],
    });
    this.logger.info(res.map(e => [e.partition, e.offset, e.topicName]));
    await producer.disconnect();
  }
  async consumeMessages<T>(topic: string, handler: (data: T) => Promise<boolean>) {
    const consumer = this.kafka.consumer({ groupId: this.kafkaGroupId });
    await consumer.connect();
    await consumer.subscribe({ topic, fromBeginning: true });

    await consumer.run({
      eachMessage: async ({ message, topic }) => {
        // Handle the received message
        // deserializing stringified JSON object
        let data: T;
        try {
          data = JSON.parse(message.value.toString());
        } catch (error) {
          this.logger.error(`${topic} message.value deserialization failed`, error);
          return;
        }
        try {
          await handler(data);
        } catch (error) {}
      },
    });
  }
}
