import {IsNotEmpty} from 'class-validator';

export class CreateTodoDto{
    @IsNotEmpty()
    title: string;
    description: string;
    status: 'new' | 'done';
    userId: number;
}

export class UpdateTodoDto{
    id: number;
    title?: string;
    description?: string;
    status?: 'new' | 'done';
    userId: number;
}