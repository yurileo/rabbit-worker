import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth.module';
import { RMQModule, RMQService, RMQTestService } from 'nestjs-rmq';
import { INestApplication } from '@nestjs/common';
import { UserLogin } from '@rabbit-worker/contracts';

const authLogin: UserLogin.Request = {
    login: 'log',
    password: 'pass',
};

describe('AuthController', () => {
    let app: INestApplication;
    let rmqService: RMQTestService;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                ConfigModule.forRoot({ isGlobal: true, envFilePath: 'envs/.auth.env' }),
                RMQModule.forTest({}),
                AuthModule,
            ],
        }).compile();

        app = module.createNestApplication();
        rmqService = app.get(RMQService);
        await app.init();
    });

    it('login', async () => {
        const res = await rmqService.triggerRoute<UserLogin.Request, UserLogin.Response>(
            UserLogin.topic,
            authLogin,
        );
        expect(res.token).toEqual('success_token');
    });

    it('failed login', async () => {
        const res = rmqService.triggerRoute<UserLogin.Request, UserLogin.Response>(
            UserLogin.topic,
            {
                ...authLogin,
                password: '',
            },
        );
        expect(res).rejects.toThrow('Login or Password empty');
    });

    afterAll(async () => {
        app.close();
    });
});
