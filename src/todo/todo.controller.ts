import { Controller, Get, Param, Post, Body, Put, Delete, UseGuards, Query } from "@nestjs/common";
import { TodoService } from "../services/todo.service";
import { Todo } from "./todo.entity";
import { CreateTodoDto, UpdateTodoDto } from "../DTO/todo.dto";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { UsersService } from "src/services/users.service";

@Controller('todo')
export class TodoController {

    constructor(
        private readonly todoService: TodoService, 
        private readonly usersService: UsersService
    ) { }

    // @UseGuards(JwtAuthGuard)
    // @Get()
    // async getAll(): Promise<Todo[]> {
    //     console.log('get all todo---->');
    //     return this.todoService.getAll();
    // }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    getOne(@Param('id') id: number): Promise<Todo> {
        return this.todoService.getOne(id);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    getByUserId(@Query('userid') uid): Promise<Todo[]> {
        return this.todoService.getByUserId(uid);
    }

    // //@UseGuards(JwtAuthGuard)
    // @Get()
    // async getByUserId(@Req() req): Promise<Todo[]> {
    //     console.log('1',req.username);
    //     const id = await this.usersService.findUserIdByUsername(req.username);
    //     console.log('get by id:',id);
    //     return this.todoService.getByUserId(id);
    // }

    @UseGuards(JwtAuthGuard)
    @Post()
    createTodo(@Body() todo: CreateTodoDto) {
        this.todoService.createTodo(todo);
    }

    @UseGuards(JwtAuthGuard)
    @Put()
    updateTodo(@Body() todo: UpdateTodoDto) {
        this.todoService.updateTodo(todo);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    deleteTodo(@Param('id') id: number) {
        this.todoService.deleteTodo(id);
    }
}