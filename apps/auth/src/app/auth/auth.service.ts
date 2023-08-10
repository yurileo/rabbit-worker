import { Injectable, Logger } from '@nestjs/common';
import { UserLogin } from '@rabbit-worker/contracts';

@Injectable()
export class AuthService {
    private readonly logger = new Logger('AuthService');

    login(dto: UserLogin.Request): UserLogin.Response {
        this.logger.verbose(`Processing login request of user ${dto.login}`);

        if (!dto.login || !dto.password) {
            throw new Error('Login or Password empty');
        }
        return { token: 'success_token' };
    }
}
