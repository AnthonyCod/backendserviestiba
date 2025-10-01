import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { IProposalRepository } from '../../domain/ports/proposal.repository.port';
import { Proposal } from '@prisma/client';
import { CreateProposalDto } from '../../application/dtos/create.proposal.dto';

@Injectable()
export class ProposalRepositoryPrisma implements IProposalRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateProposalDto): Promise<Proposal> {
    return this.prisma.proposal.create({
      data,
    });
  }

  async findById(id: number): Promise<Proposal | null> {
    return this.prisma.proposal.findUnique({
      where: { id },
    });
  }
}