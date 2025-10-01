import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { IQuotationRepository } from '../../domain/ports/quotation.repository.port';
import { Quotation } from '@prisma/client';
import { UpdateQuotationDto } from '../../application/dtos/update.quotation.dto';

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

  async addStevedores(quotationId: number, stevedoreIds: number[]): Promise<void> {
    // 1. Preparamos los datos para la inserción múltiple
    const dataToInsert = stevedoreIds.map(stevedoreId => ({
      quotationId: quotationId,
      estibadorId: stevedoreId,
    }));

    // 2. Usamos createMany para una inserción eficiente en la tabla relacional
    await this.prisma.quotationEstibador.createMany({
      data: dataToInsert,
      skipDuplicates: true, // Opcional: evita errores si intentas insertar un duplicado
    });
  }

    async findAll(): Promise<Quotation[]> {
    return this.prisma.quotation.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

   async findById(id: number): Promise<Quotation | null> {
    return this.prisma.quotation.findUnique({
      where: { id },
      include: { // Trae los datos relacionados
        estibadores: {
          select: { estibador: true },
        },
        client: true,
      },
    });
  }

    async update(id: number, data: UpdateQuotationDto): Promise<Quotation> {
    return this.prisma.quotation.update({
      where: { id },
      data,
    });
  }

  async delete(id: number): Promise<void> {
    await this.prisma.quotation.delete({
      where: { id },
    });
  }
}