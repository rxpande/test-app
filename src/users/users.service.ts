import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entities/users.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users)
        private usersRepository: Repository<Users>,
    ) { }

    public async getAllUsers(): Promise<Users[]> {
        return await this.usersRepository.find();
    }

    public async getUserByUserName(userName: string): Promise<Users[]> {
        return await this.usersRepository.find({
            where: {
                user_name: userName 
            }
        });
    }

    public async create(user: Users): Promise<Users> {

        // Set created_at to current date
        user.created_at = new Date();
        
        let isUserNameUniq = true;
        
        if( user && user.user_name ) {
            const users = await this.getUserByUserName(user.user_name);
            if( users && users.length ) {
                isUserNameUniq = false;
            }
        }

        if(!isUserNameUniq) {
            throw new HttpException( 
                `${user.user_name} user name is already present`, 
                HttpStatus.BAD_REQUEST
            );
        }

        return this.usersRepository.save(user);
    }
}