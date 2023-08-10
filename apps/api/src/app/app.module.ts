import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { ConfigModule } from '@nestjs/config';
import { RMQModule } from 'nestjs-rmq';
import { getRMQConfig } from './configs/rmq.config';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true, envFilePath: 'envs/.api.env' }),
        RMQModule.forRootAsync(getRMQConfig()),
    ],
    controllers: [AuthController],
    providers: [],
})
export class AppModule {}
