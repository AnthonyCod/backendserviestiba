import { Inject, Injectable } from '@nestjs/common';
import { PROPOSAL_REPOSITORY } from '../../domain/ports/proposal.repository.port';
import type { IProposalRepository } from '../../domain/ports/proposal.repository.port';
import { CreateProposalDto } from '../dtos/create.proposal.dto';

@Injectable()
export class CreateProposalUseCase {
  constructor(
    @Inject(PROPOSAL_REPOSITORY)
    private readonly proposalRepository: IProposalRepository,
  ) {}

  async execute(createProposalDto: CreateProposalDto) {
    return this.proposalRepository.create(createProposalDto);
  }
}