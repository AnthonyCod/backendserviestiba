import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { IQuotationRepository } from '../../domain/ports/quotation.repository.port';
import { Quotation } from '@prisma/client';

// Esta clase implementa el contrato IQuotationRepository usando Prisma.
@Injectable()
export class QuotationRepositoryPrisma implements IQuotationRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: {
    proposalId: number;
    clientId: number;
    workerId: number;
    terminalId: number;
  }): Promise<Quotation> {
    return this.prisma.quotation.create({ data });
  }

  async addStevedore(quotationId: number, stevedoreId: number): Promise<void> {
    // Prisma maneja la creación en la tabla relacional QuotationEstibador
    await this.prisma.quotationEstibador.create({
      data: {
        quotationId,
        estibadorId: stevedoreId,
      },
    });
  }
}