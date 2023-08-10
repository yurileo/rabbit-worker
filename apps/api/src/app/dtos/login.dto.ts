import { IsEmail, IsString } from 'class-validator';

export class LoginDto {
    @IsEmail()
    login: string;

    @IsString()
    password: string;
}
