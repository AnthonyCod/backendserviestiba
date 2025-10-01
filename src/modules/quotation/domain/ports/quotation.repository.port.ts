import { Quotation } from '@prisma/client';
import { UpdateQuotationDto } from '../../application/dtos/update.quotation.dto';

export interface IQuotationRepository {
  /**
   * Crea una nueva cotización en la base de datos.
   */
  create(data: {
    proposalId: number;
    clientId: number;
    workerId: number;
    terminalId: number;
  }): Promise<Quotation>;

  /**
   * Asigna uno o varios estibadores a una cotización existente.
   */
  addStevedores(quotationId: number, stevedoreIds: number[]): Promise<void>;

  findAll(): Promise<Quotation[]>;
  findById(id: number): Promise<Quotation | null>;
  update(id: number, data: UpdateQuotationDto): Promise<Quotation>;
  delete(id: number): Promise<void>;
}

// Token para inyección de dependencias
export const QUOTATION_REPOSITORY = 'QUOTATION_REPOSITORY';