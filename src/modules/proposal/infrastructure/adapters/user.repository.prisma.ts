// src/modules/user/infrastructure/adapters/users.repository.prisma.ts

import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { UserRepository } from '../../domain/ports/proposal.repository.port';
import { User } from '../../domain/entities/proposal.entity';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(user: User): Promise<User> {
    return this.prisma.user.create({
      data: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone ?? null,
        address: user.address ?? null,
        password: user.password,  // Asegúrate de incluir el campo `password`
        dni: user.dni ?? null,    // También incluye otros campos como `dni` si son necesarios
      },
    });
  }

  async findById(id: number): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async update(id: number, user: User): Promise<User> {
    return this.prisma.user.update({
      where: { id },
      data: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone ?? null,
        address: user.address ?? null,
        password: user.password,  
        dni: user.dni ?? null,    
      },
    });
  }

  async delete(id: number): Promise<void> {
    await this.prisma.user.delete({
      where: { id },
    });
  }
}
