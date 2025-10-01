import { Module } from '@nestjs/common';
import { PrismaModule } from 'prisma/prisma.module';

// --- Infraestructura ---
import { ProposalController } from './infrastructure/controllers/proposal.controller';
import { ProposalRepositoryPrisma } from './infrastructure/adapters/proposal.repository.prisma';

// --- Dominio (Puerto) ---
import { PROPOSAL_REPOSITORY } from './domain/ports/proposal.repository.port';

// --- Aplicación (Casos de Uso) ---
import { CreateProposalUseCase } from './application/use-cases/create.proposal.usecase';
import { GetProposalByIdUseCase } from './application/use-cases/get.proposal.by.id.usecase';

@Module({
  imports: [
    PrismaModule, // Importa PrismaModule para que el repositorio pueda usar Prisma
  ],
  controllers: [
    ProposalController, // Define el controlador de este módulo
  ],
  providers: [
    // Registra todos los casos de uso para que sean inyectables
    CreateProposalUseCase,
    GetProposalByIdUseCase,
    // Conecta la interfaz (puerto) con su implementación concreta (adaptador)
    {
      provide: PROPOSAL_REPOSITORY,
      useClass: ProposalRepositoryPrisma,
    },
  ],
  exports: [
    // Exporta los casos de uso que otros módulos (como Quotation) necesitarán usar
    CreateProposalUseCase,
    GetProposalByIdUseCase,
  ],
})
export class ProposalsModule {}