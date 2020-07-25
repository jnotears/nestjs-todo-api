import { Controller, Get, Param, Post, Body, Put, Delete, UseGuards } from "@nestjs/common";
import { UsersService } from "../services/users.service";
import { User } from "./user.entity";
import { CreateUserDto } from "../dto/user.dto";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";

@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService) { }

    @UseGuards(JwtAuthGuard)
    @Get()
    getAll(): Promise<User[]> {
        return this.usersService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    getOne(@Param('id') id: number): Promise<User> {
        return this.usersService.getOne(id);
    }

    //@UseGuards(JwtAuthGuard)
    // @Post()
    // createUser(@Body() user: CreateUserDto) {
    //     console.log('create ---->');
    //     console.log(user);
    //     this.usersService.createUser(user);
    // }

    // @UseGuards(JwtAuthGuard)
    // @Put(':id')
    // updateuser(@Param('id') id: number, @Body() user: UpdateuserDto) {
    //     this.userService.updateuser(id, user);
    // }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    deleteuser(@Param('id') id: number) {
        this.usersService.deleteUser(id);
    }
}