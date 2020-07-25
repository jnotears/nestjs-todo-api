import { Injectable } from '@nestjs/common';
import { Todo } from '../todo/todo.entity';
import { CreateTodoDto, UpdateTodoDto } from '../dto/todo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TodoService {
    constructor(@InjectRepository(Todo) private todoRepo: Repository<Todo>) { }

    async getAll(): Promise<Todo[]> {
        return await this.todoRepo.find();
    }

    async getOne(id: number): Promise<Todo> {
        return await this.todoRepo.findOne(id);
    }

    async getByUserId(uId: number): Promise<Todo[]>{
        return await this.todoRepo.find({userId: uId});
    }

    async createTodo(creTodo: CreateTodoDto): Promise<Todo> {
        const todo = new Todo();
        todo.title = creTodo.title;
        todo.description = creTodo.description;
        todo.status = creTodo.status;
        todo.userId = creTodo.userId
        return await this.todoRepo.save(todo);
    }

    async updateTodo(updateTodo: UpdateTodoDto){
        return await this.todoRepo.save(updateTodo);
    }

    async deleteTodo(id: number) {
        return await this.todoRepo.delete(id);
    }
}
