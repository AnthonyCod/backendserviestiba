// src/modules/user/controllers/user.controller.ts

import { Controller, Post, Get, Param, Body, Put, ParseIntPipe } from '@nestjs/common';
import { CreateUserDto } from '../../application/dtos/create-user.dto';
import { CreateUserUseCase } from '../../application/use-cases/create-user.usecase';
import { GetUserUseCase } from '../../application/use-cases/get-user.usecase';
import { UpdateUserDto } from '../../application/dtos/update-user.dto';
import { UpdateUserUseCase } from '../../application/use-cases/update-user.usecase';



@Controller('users')
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly getUserUseCase: GetUserUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase
  ) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.createUserUseCase.execute(createUserDto);
  }

  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number) {
    return this.getUserUseCase.execute(id);
  }

   @Put(':id') 
  async update(@Param('id', ParseIntPipe) id: string, @Body() updateUserDto: UpdateUserDto) {
    const userId = parseInt(id, 10); 
    return this.updateUserUseCase.execute(userId, updateUserDto);
  }
}
