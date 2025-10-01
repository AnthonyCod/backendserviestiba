import { Inject, Injectable } from '@nestjs/common';
import { QUOTATION_REPOSITORY } from '../../domain/ports/quotation.repository.port';
import type { IQuotationRepository } from '../../domain/ports/quotation.repository.port';

@Injectable()
export class ListQuotationsUseCase {
  constructor(
    @Inject(QUOTATION_REPOSITORY)
    private readonly quotationRepository: IQuotationRepository,
  ) {}

  async execute() {
    return this.quotationRepository.findAll();
  }
}