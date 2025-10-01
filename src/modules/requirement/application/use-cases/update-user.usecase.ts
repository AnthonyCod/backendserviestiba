// src/modules/user/application/use-cases/update-user.usecase.ts

import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../domain/ports/users.repository.port';
import { User } from '../../domain/entities/user.entity';
import { UpdateUserDto } from 'src/modules/user/application/dtos/update-user.dto';

@Injectable()
export class UpdateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new Error('User not found');
    }

    // Actualiza solo los campos que se han enviado en el DTO
    user.firstName = updateUserDto.firstName ?? user.firstName;
    user.lastName = updateUserDto.lastName ?? user.lastName;
    user.email = updateUserDto.email ?? user.email;
    user.phone = updateUserDto.phone ?? user.phone;
    user.address = updateUserDto.address ?? user.address;
    user.password = updateUserDto.password ?? user.password;

    return this.userRepository.update(id, user);
  }
}
