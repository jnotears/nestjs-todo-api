import { Module } from '@nestjs/common';
import { TodoService } from '../services/todo.service';
import { TodoController } from './todo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from './todo.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Todo]),UsersModule],
  providers: [TodoService],
  controllers: [TodoController]
})
export class TodoModule { }
