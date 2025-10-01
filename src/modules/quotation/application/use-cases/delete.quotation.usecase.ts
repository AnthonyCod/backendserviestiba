import { Inject, Injectable } from '@nestjs/common';
import { QUOTATION_REPOSITORY } from '../../domain/ports/quotation.repository.port';
import type { IQuotationRepository } from '../../domain/ports/quotation.repository.port';
import { GetQuotationByIdUseCase } from './get.quotation.by.id.usecase';

@Injectable()
export class DeleteQuotationUseCase {
  constructor(
    @Inject(QUOTATION_REPOSITORY)
    private readonly quotationRepository: IQuotationRepository,
    private readonly getQuotationByIdUseCase: GetQuotationByIdUseCase,
  ) {}

  async execute(id: number): Promise<void> {
    await this.getQuotationByIdUseCase.execute(id); // Reutilizamos para verificar si existe
    await this.quotationRepository.delete(id);
  }
}