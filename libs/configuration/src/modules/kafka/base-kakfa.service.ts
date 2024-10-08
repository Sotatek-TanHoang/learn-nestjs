import { EEnvKey } from '@constant/env.constant';
import { sleep } from '@helpers/time';
import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { CustomConfigService } from '@shared-modules/environment/custom-config-service.service';
import { LoggerService } from '@shared-modules/logger/logger.service';
import { assert } from 'console';
import { Consumer, Kafka, logLevel, Producer } from 'kafkajs';

@Injectable()
export class KafkaService implements OnModuleInit, OnModuleDestroy {
  private kafka: Kafka;
  private readonly kafkaClientId: string;
  private readonly kafkaGroupId: string;
  private readonly producer: Producer;
  private readonly consumers: Consumer[] = [];
  constructor(private configService: CustomConfigService, private readonly loggerService: LoggerService) {
    this.kafkaClientId = 'client-1' + Date.now();
    this.kafkaGroupId = this.configService.get(EEnvKey.KAFKA_GROUP_ID);

    this.kafka = new Kafka({
      clientId: this.kafkaClientId,
      brokers: this.configService.getAllConfig().kafka.brokers,
      logLevel: logLevel.INFO,
    });
    this.producer = this.kafka.producer({
      idempotent: true,
    });
  }
  async onModuleInit() {
    await this.producer.connect();
    this.logger.info('producer/consumer connected');
  }
  async onModuleDestroy() {
    console.log('before shutdown');
    await this.producer.disconnect();

    await Promise.all(this.consumers.map(c => c.stop().then(() => c.disconnect())));

    this.logger.info('producer/consumer disconnected');
  }
  private logger = this.loggerService.getLogger('KAFKA_SERVICE');
  async sendMessage<T>(topic: string, message: T) {
    assert(typeof message === 'object', 'only support object as raw message.');
    const res = await this.producer.send({
      topic,
      messages: [{ value: JSON.stringify(message) }],
    });
    this.logger.info(res.map(e => [e.partition, e.offset, e.topicName]));
  }
  async consumeMessages<T>(topics: string[], handler: (data: T) => Promise<boolean>) {
    this.logger.info('inside consumer');
    const consumer = this.kafka.consumer({ groupId: this.kafkaGroupId });
    // later disconnect and stop;
    this.consumers.push(consumer);

    await consumer.connect();
    await consumer.subscribe({ topics });
    await consumer.run({
      eachMessage: async ({ message, topic, partition }) => {
        // deserializing stringified JSON object
        this.logger.info(`Handling topic ${topic}, partition ${partition}.`);
        let data: T;
        try {
          data = JSON.parse(message.value.toString());
        } catch (error) {
          this.logger.error(`${topic} message.value deserialization failed`, error);
          return;
        }
        // consume the message
        // throw new Error(`${message.value.toString()} failed`);
        try {
          await handler(data);
        } catch (error) {}
        await sleep(100, 'milis');
      },
    });
  }
}
