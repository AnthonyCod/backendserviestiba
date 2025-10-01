import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { QUOTATION_REPOSITORY } from '../../domain/ports/quotation.repository.port';
import type { IQuotationRepository } from '../../domain/ports/quotation.repository.port';

@Injectable()
export class GetQuotationByIdUseCase {
  constructor(
    @Inject(QUOTATION_REPOSITORY)
    private readonly quotationRepository: IQuotationRepository,
  ) {}

  async execute(id: number) {
    const quotation = await this.quotationRepository.findById(id);
    if (!quotation) {
      throw new NotFoundException(`Cotización con ID ${id} no encontrada.`);
    }
    return quotation;
  }
}