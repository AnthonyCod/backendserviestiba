import { IsInt, IsPositive } from 'class-validator';

export class CreateQuotationDto {
  @IsInt()
  @IsPositive()
  proposalId: number;

  @IsInt()
  @IsPositive()
  workerId: number;

  @IsInt()
  @IsPositive()
  terminalId: number;
}