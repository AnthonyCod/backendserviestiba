// caso de uso para obtener un User por su ID.
import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../domain/ports/users.repository.port';
import { User } from '../../domain/entities/user.entity';

@Injectable()
export class GetUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(id: number): Promise<User> {
    const userId = parseInt(id.toString(),10)

    const user = await this.userRepository.findById(id);
    
    if (!user) {
      throw new Error('User not found');  // Lanza un error si no se encuentra el usuario
    }

    return user;
  }
}
