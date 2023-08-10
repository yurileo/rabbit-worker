import { ConfigModule, ConfigService } from '@nestjs/config';
import { IRMQServiceAsyncOptions } from 'nestjs-rmq';

export const getRMQConfig = (): IRMQServiceAsyncOptions => ({
    inject: [ConfigService],
    imports: [ConfigModule],
    useFactory: (configService: ConfigService) => ({
        exchangeName: configService.get('AMQP_EXCHANGE', ''),
        connections: [
            {
                login: configService.get('AMQP_USER', ''),
                password: configService.get('AMQP_PASSWORD', ''),
                host: configService.get('AMQP_HOSTNAME', ''),
                port: configService.get('AMQP_PORT', 5672),
            },
        ],
        queueName: configService.get('AMQP_QUEUE', ''),
        prefetchCount: 32,
        serviceName: 'rabbit-worker',
    }),
});
