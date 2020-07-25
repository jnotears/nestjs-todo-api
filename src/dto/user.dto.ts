import {IsNotEmpty} from 'class-validator';

export class CreateUserDto{
    @IsNotEmpty()
    username: string;
    password: string;
    firstName: string;
    lastName: string;
}

export class UpdateUserDto{
    username?: string;
    password?: string;
    firstName: string;
    lastName: string;
}