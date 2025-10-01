import { Controller, Post, Body, Get, Param, ParseIntPipe } from '@nestjs/common';
import { CreateProposalDto } from '../../application/dtos/create.proposal.dto';
import { CreateProposalUseCase } from '../../application/use-cases/create.proposal.usecase';
import { GetProposalByIdUseCase } from '../../application/use-cases/get.proposal.by.id.usecase';

@Controller('proposals')
export class ProposalController {
  constructor(
    private readonly createProposalUseCase: CreateProposalUseCase,
    private readonly getProposalByIdUseCase: GetProposalByIdUseCase,
  ) {}

  @Post()
  create(@Body() createProposalDto: CreateProposalDto) {
    return this.createProposalUseCase.execute(createProposalDto);
  }

  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.getProposalByIdUseCase.execute(id);
  }
}