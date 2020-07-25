import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { CreateUserDto } from '../dto/user.dto';


@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) { }


  async findUserIdByUsername(username: string): Promise<number>{
    const user: User = await this.userRepo.findOne({username: username});
    return await user.id;
  }

  async findAll(): Promise<User[]>{
    return await this.userRepo.find();
  }

  async getOne(id: number): Promise<User>{
    return await this.userRepo.findOne(id);
  }

  async findByUsername(username: string): Promise<User | undefined> {
    return await this.userRepo.findOne({username: username});
  }

  async isValidUser(username: string): Promise<boolean>{
    const user: User = await this.userRepo.findOne({username: username});
    if(user === undefined || user === null){
      return true;
    }
    else{
      return false;
    }
  }

  async createUser(creUser: CreateUserDto): Promise<User> {
    const checkValid: boolean = await this.isValidUser(creUser.username);
    if(!checkValid){
      return null;
    };
    const user = new User();
    user.username = creUser.username;
    user.password = creUser.password;
    user.firstName = creUser.firstName;
    user.lastName = creUser.lastName;
    return await this.userRepo.save(user);
  }

  async deleteUser(id: number){
    return await this.userRepo.delete(id);
  }
}