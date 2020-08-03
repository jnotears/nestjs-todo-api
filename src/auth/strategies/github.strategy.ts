import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport';
import { VerifiedCallback } from 'passport-github';
import { config } from 'dotenv';

config();

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
    constructor() {
        super({
            clientID: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_SECRET,
            callbackURL: 'http://localhost:3000/auth/github/redirect',
            scope: ['email', 'profile']
        });
    }

    async validate(accessToken: string, refreshToken: string, profile: any, done: VerifiedCallback): Promise<any> {
        console.log('validate git')
        const { name, email, photo } = profile;
        const user = {
            email: email[0].value,
            firstName: name,
            lastName: name,
            picture: photo[0].value,
            accessToken
        }
        done(null, user);
    }
}