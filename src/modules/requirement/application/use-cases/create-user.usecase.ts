// Este archivo crea un nuevo User. Recibe un DTO de entrada, llama al repositorio para persistirlo y devuelve el resultado.
import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../domain/ports/users.repository.port';
import { User } from '../../domain/entities/user.entity';
import { CreateUserDto } from 'src/modules/user/application/dtos/create-user.dto';

@Injectable()
export class CreateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();
    user.firstName = createUserDto.firstName;
    user.lastName = createUserDto.lastName;
    user.email = createUserDto.email;
    user.phone = createUserDto.phone;
    user.address = createUserDto.address;
    user.password = createUserDto.password;

    return this.userRepository.create(user);
  }
}
