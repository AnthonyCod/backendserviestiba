import { Inject, Injectable } from '@nestjs/common';
import  {QUOTATION_REPOSITORY } from '../../domain/ports/quotation.repository.port';
import type { IQuotationRepository } from '../../domain/ports/quotation.repository.port';
import { CreateQuotationDto } from '../dtos/create.quotation.dto';

@Injectable()
export class CreateQuotationUseCase {
  // El Chef depende del CONTRATO (puerto), no de la implementación específica.
  constructor(
    @Inject(QUOTATION_REPOSITORY)
    private readonly quotationRepository: IQuotationRepository,
  ) {}

  async execute(data: CreateQuotationDto) {
    // Aquí podrías agregar lógica de negocio compleja si fuera necesario.
    // Por ejemplo, verificar si la propuesta asociada es válida.
    console.log('Creando cotización con los datos:', data);
    return this.quotationRepository.create(data);
  }
}