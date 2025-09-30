import { Quotation } from '@prisma/client';


export interface IQuotationRepository {
  /**
   * Crea una nueva cotización en la base de datos.
   * @param data - Los datos para crear la cotización.
   */
  create(data: {
    proposalId: number;
    clientId: number;
    workerId: number;
    terminalId: number;
  }): Promise<Quotation>;

  /**
   * Asigna un estibador a una cotización existente.
   * @param quotationId - El ID de la cotización.
   * @param stevedoreId - El ID del estibador a asignar.
   */
  addStevedore(quotationId: number, stevedoreId: number): Promise<void>;
}

// Usamos un token para que NestJS sepa qué inyectar.
export const QUOTATION_REPOSITORY = 'QUOTATION_REPOSITORY';