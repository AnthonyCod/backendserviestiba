import { QuotationStatus } from '@prisma/client';

export abstract class Quotation {
  id: number;
  proposalId: number;
  clientId: number;
  workerId: number;
  terminalId: number;
  status: QuotationStatus;
  pdfUrl?: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(partial: Partial<Quotation>) {
    Object.assign(this, partial);
  }

  // En el futuro, podrías tener lógica aquí:
  // approve() {
  //   if (this.status === QuotationStatus.Pendiente) {
  //     this.status = QuotationStatus.Aprobada;
  //   }
  // }
}