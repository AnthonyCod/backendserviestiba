// src/modules/user/users.module.ts

import { Module } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { UserController } from './infrastructure/controllers/user.controller';
import { UserRepository } from './domain/ports/proposal.repository.port';
import { PrismaUserRepository } from './infrastructure/adapters/user.repository.prisma';
import { CreateUserUseCase } from './application/use-cases/create-user.usecase';
import { GetUserUseCase } from './application/use-cases/get-user.usecase';
import { UpdateUserUseCase } from './application/use-cases/update-user.usecase';

@Module({
  controllers: [UserController],
  providers: [
    PrismaService,
    { provide: UserRepository, useClass: PrismaUserRepository },
    CreateUserUseCase,
    GetUserUseCase,
    UpdateUserUseCase,
  ],
})
export class UserModule {}
