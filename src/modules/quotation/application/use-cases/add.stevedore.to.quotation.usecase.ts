import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import  {QUOTATION_REPOSITORY } from '../../domain/ports/quotation.repository.port';
import type { IQuotationRepository } from '../../domain/ports/quotation.repository.port';

@Injectable()
export class AddStevedoreToQuotationUseCase {
  constructor(
    @Inject(QUOTATION_REPOSITORY)
    private readonly quotationRepository: IQuotationRepository,
  ) {}

  async execute(quotationId: number, stevedoreId: number) {
    // Lógica de negocio: podrías verificar aquí si la cotización
    // o el estibador existen antes de intentar la asignación.
    console.log(`Asignando estibador ${stevedoreId} a la cotización ${quotationId}`);
    return this.quotationRepository.addStevedore(quotationId, stevedoreId);
  }
}