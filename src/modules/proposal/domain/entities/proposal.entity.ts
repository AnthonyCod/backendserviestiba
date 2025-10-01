import { ProposalStatus } from '@prisma/client';

export class Proposal {
  id: number;
  clientId: number;
  price: number;
  time: string;
  unity: string;
  prWork: ProposalStatus;
  location: string;
  product: string;
  activity: string;
  description: string | null;
  pdfUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
}