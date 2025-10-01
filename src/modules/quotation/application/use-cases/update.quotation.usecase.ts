import { Inject, Injectable } from '@nestjs/common';
import { QUOTATION_REPOSITORY } from '../../domain/ports/quotation.repository.port';
import type { IQuotationRepository } from '../../domain/ports/quotation.repository.port';
import { GetQuotationByIdUseCase } from './get.quotation.by.id.usecase';
import { UpdateQuotationDto } from '../dtos/update.quotation.dto';

@Injectable()
export class UpdateQuotationUseCase {
  constructor(
    @Inject(QUOTATION_REPOSITORY)
    private readonly quotationRepository: IQuotationRepository,
    private readonly getQuotationByIdUseCase: GetQuotationByIdUseCase,
  ) {}

  async execute(id: number, data: UpdateQuotationDto) {
    await this.getQuotationByIdUseCase.execute(id); 
    return this.quotationRepository.update(id, data);
  }
}