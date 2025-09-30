// Archivo para crear, obtener y actualizar usuario - conecta con logica de negocio
import { User } from '../../domain/entities/user.entity';

export abstract class UserRepository {
  abstract create(user: User): Promise<User>;
  abstract findById(id: number): Promise<User | null>;
  abstract findAll(): Promise<User[]>;
  abstract update(id: number, user: User): Promise<User>;
  abstract delete(id: number): Promise<void>;
}
