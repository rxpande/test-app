import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @Get(':userName')
  getUserByUserName(@Param('userName') userName: string) {
    return this.usersService.getUserByUserName(userName);
  }
  
  @Put()
  create(@Body() createUser) {
    return this.usersService.create(createUser);
  }

}
