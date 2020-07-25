import { Injectable } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) { }

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findByUsername(username);
        if (user && user.password === pass) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: any) {
        const payload = { username: user.username, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload),
            id: user.id,
            username: user.username
        };
    }

    async register(user: any){
        if(await this.usersService.createUser(user) === null){
            return false;
        }
        const uid = await this.usersService.findUserIdByUsername(user.username);
        const payload = { username: user.username, sub: uid };
        console.log(payload);
        return {
            access_token: this.jwtService.sign(payload),
            id: uid,
            username: user.username
        };
    }
}