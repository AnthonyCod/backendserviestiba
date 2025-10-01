import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PROPOSAL_REPOSITORY } from '../../domain/ports/proposal.repository.port';
import type { IProposalRepository } from '../../domain/ports/proposal.repository.port';

@Injectable()
export class GetProposalByIdUseCase {
  constructor(
    @Inject(PROPOSAL_REPOSITORY)
    private readonly proposalRepository: IProposalRepository,
  ) {}

  async execute(id: number) {
    const proposal = await this.proposalRepository.findById(id);
    if (!proposal) {
      throw new NotFoundException(`Propuesta con ID ${id} no encontrada.`);
    }
    return proposal;
  }
}