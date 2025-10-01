import { Proposal } from '@prisma/client';
// ... otros imports si los tienes

export interface IProposalRepository {
  create(data: any): Promise<Proposal>; // Ya deberías tener este
  
  // --- AÑADE ESTE MÉTODO ---
  findById(id: number): Promise<Proposal | null>;
}

export const PROPOSAL_REPOSITORY = 'PROPOSAL_REPOSITORY';