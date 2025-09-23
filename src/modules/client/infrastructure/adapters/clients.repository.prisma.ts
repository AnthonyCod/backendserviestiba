import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { ClientsRepositoryPort } from '../../application/ports/clients.repository.port';
import { Client, User } from '@prisma/client';

@Injectable()
export class ClientsRepositoryPrisma implements ClientsRepositoryPort {
  constructor(private readonly prisma: PrismaService) {}

  create(data: Parameters<ClientsRepositoryPort['create']>[0]): Promise<Client> {
    return this.prisma.client.create({ data });
  }

  findAll(): Promise<(Client & { user: User })[]> {
    return this.prisma.client.findMany({
      include: { user: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  findById(id: number): Promise<(Client & { user: User }) | null> {
    return this.prisma.client.findUnique({
      where: { id },
      include: { user: true, bankAccounts: true, quotations: true, requirements: true, proposals: true },
    });
  }

  update(id: number, data: Partial<Client>): Promise<Client> {
    return this.prisma.client.update({ where: { id }, data });
  }
}
