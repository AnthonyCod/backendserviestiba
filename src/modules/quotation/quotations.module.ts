import { Module } from '@nestjs/common';
import { PrismaModule } from 'prisma/prisma.module';
import { QuotationController } from './infrastructure/controllers/quotation.controller';
import { QUOTATION_REPOSITORY } from './domain/ports/quotation.repository.port';
import { QuotationRepositoryPrisma } from './infrastructure/adapters/quotation.repository.prisma';

// Importa todos los Casos de Uso
import { CreateQuotationUseCase } from './application/use-cases/create.quotation.usecase';
import { AddStevedoresToQuotationUseCase } from './application/use-cases/add.stevedore.to.quotation.usecase';
import { ListQuotationsUseCase } from './application/use-cases/list.quotations.usecase';
import { GetQuotationByIdUseCase } from './application/use-cases/get.quotation.by.id.usecase';
import { UpdateQuotationUseCase } from './application/use-cases/update.quotation.usecase';
import { DeleteQuotationUseCase } from './application/use-cases/delete.quotation.usecase';
import { ProposalsModule } from '../proposal/proposal.module';

@Module({
  imports: [PrismaModule,ProposalsModule],
  controllers: [QuotationController],
  providers: [
    // Registra todos los Casos de Uso
    CreateQuotationUseCase,
    AddStevedoresToQuotationUseCase,
    ListQuotationsUseCase,
    GetQuotationByIdUseCase,
    UpdateQuotationUseCase,
    DeleteQuotationUseCase,
    // Registra el Repositorio
    {
      provide: QUOTATION_REPOSITORY,
      useClass: QuotationRepositoryPrisma,
    },
  ],
})
export class QuotationsModule {}