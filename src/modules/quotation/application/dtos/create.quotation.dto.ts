import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateQuotationDto {
  @IsInt()
  @IsNotEmpty()
  proposalId: number;

  @IsInt()
  @IsNotEmpty()
  clientId: number;

  @IsInt()
  @IsNotEmpty()
  workerId: number;

  @IsInt()
  @IsNotEmpty()
  terminalId: number;
}