import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { RMQModule } from 'nestjs-rmq';
import { ConfigModule } from '@nestjs/config';
import { getRMQConfig } from './configs/rmq.config';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true, envFilePath: 'envs/.auth.env' }),
        RMQModule.forRootAsync(getRMQConfig()),
        AuthModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
