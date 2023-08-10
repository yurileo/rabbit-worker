import { Body, Controller, Logger, Post, UnauthorizedException } from '@nestjs/common';
import { UserLogin } from '@rabbit-worker/contracts';
import { RMQService } from 'nestjs-rmq';
import { LoginDto } from '../dtos/login.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly rmqService: RMQService) {}
    private readonly logger = new Logger('AuthController');

    @Post('login')
    async getToken(@Body() dto: LoginDto): Promise<UserLogin.Response> {
        try {
            this.logger.verbose('Before Rabbit request');
            const response = await this.rmqService.send<UserLogin.Request, UserLogin.Response>(
                UserLogin.topic,
                dto,
            );
            this.logger.log('Succesful Rabbit request finished');
            return response;
        } catch (e) {
            if (e instanceof Error) {
                this.logger.error('Rabbit request error');
                throw new UnauthorizedException(e.message);
            }
        }
    }
}
