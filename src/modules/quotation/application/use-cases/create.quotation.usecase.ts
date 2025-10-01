import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { QUOTATION_REPOSITORY } from '../../domain/ports/quotation.repository.port';
import type { IQuotationRepository } from '../../domain/ports/quotation.repository.port';
import { CreateQuotationDto } from '../dtos/create.quotation.dto';
// IMPORTANTE: Debes tener una forma de obtener propuestas.
// Asumiremos que tienes un caso de uso para esto en tu módulo de propuestas. SUPER IMPORTANTE
import { GetProposalByIdUseCase } from 'src/modules/proposal/application/use-cases/get.proposal.by.id.usecase';

@Injectable()
export class CreateQuotationUseCase {
  constructor(
    @Inject(QUOTATION_REPOSITORY)
    private readonly quotationRepository: IQuotationRepository,
    // Inyectamos el caso de uso para buscar propuestas
    private readonly getProposalByIdUseCase: GetProposalByIdUseCase,
  ) {}

  async execute(createQuotationDto: CreateQuotationDto) {
    const { proposalId, workerId, terminalId } = createQuotationDto;

    // 1. Buscamos la propuesta para validar que existe y obtener el cliente
    const proposal = await this.getProposalByIdUseCase.execute(proposalId);
    
    // Si no se encuentra la propuesta, getProposalByIdUseCase ya debería lanzar un NotFoundException.
    // Si no lo hace, puedes añadir la validación aquí:
    if (!proposal) {
        throw new NotFoundException(`Proposal with ID ${proposalId} not found.`);
    }

    // 2. Extraemos el clientId de la propuesta encontrada
    const clientId = proposal.clientId;

    // 3. Creamos la cotización con los datos correctos y garantizados
    return this.quotationRepository.create({
      proposalId,
      clientId, // <-- Usamos el ID de cliente obtenido de la propuesta
      workerId,
      terminalId,
    });
  }
}