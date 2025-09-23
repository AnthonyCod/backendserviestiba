import { Client, User } from '@prisma/client';

export abstract class ClientsRepositoryPort {
  abstract create(data: {
    userId: number;
    ruc?: string | null;
    accountNumber?: string | null;
    generalNumber?: string | null;
    secondaryEmail?: string | null;
    position?: string | null;
    bankAccount?: string | null;
  }): Promise<Client>;

  abstract findAll(): Promise<(Client & { user: User })[]>;
  abstract findById(id: number): Promise<(Client & { user: User }) | null>;
  abstract update(id: number, data: Partial<Client>): Promise<Client>;
}
