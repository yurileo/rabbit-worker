import { IsString } from 'class-validator';

export namespace UserLogin {
    export const topic = 'user.login.command';

    export class Request {
        @IsString()
        login: string;

        @IsString()
        password: string;
    }

    export class Response {
        token: string;
    }
}
