import { Body, Controller } from '@nestjs/common';
import { UserLogin } from '@rabbit-worker/contracts';
import { RMQRoute, RMQValidate } from 'nestjs-rmq';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @RMQValidate()
    @RMQRoute(UserLogin.topic)
    async getToken(@Body() dto: UserLogin.Request): Promise<UserLogin.Response> {
        return this.authService.login(dto);
    }
}
