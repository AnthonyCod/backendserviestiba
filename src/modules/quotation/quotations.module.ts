import { Module } from '@nestjs/common';
import { PrismaModule } from 'prisma/prisma.module';
import { QuotationController } from './infrastructure/controllers/quotation.controller';
import { CreateQuotationUseCase } from './application/use-cases/create.quotation.usecase';
import { AddStevedoreToQuotationUseCase } from './application/use-cases/add.stevedore.to.quotation.usecase';
import { QUOTATION_REPOSITORY } from './domain/ports/quotation.repository.port';
import { QuotationRepositoryPrisma } from './infrastructure/adapters/quotation.repository.prisma';

@Module({
  imports: [PrismaModule],
  controllers: [QuotationController],
  providers: [
    // Registramos los casos de uso (los Chefs)
    CreateQuotationUseCase,
    AddStevedoreToQuotationUseCase,
    // La conexión clave:
    // Cuando alguien pida el CONTRATO (QUOTATION_REPOSITORY)...
    {
      provide: QUOTATION_REPOSITORY,
      // ... entrégale la IMPLEMENTACIÓN CONCRETA (QuotationRepositoryPrisma).
      useClass: QuotationRepositoryPrisma,
    },
  ],
})
export class QuotationsModule {}