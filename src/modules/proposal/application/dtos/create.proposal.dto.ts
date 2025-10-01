import { IsInt, IsPositive, IsNumber, IsString, IsNotEmpty, IsOptional, IsEnum } from 'class-validator';
// 1. Importa el enum 'ProposalTime' generado por Prisma
import { ProposalStatus, ProposalTime } from '@prisma/client';

export class CreateProposalDto {
  @IsInt()
  @IsPositive()
  clientId: number;

  @IsNumber()
  @IsPositive()
  price: number;
  
  @IsEnum(ProposalTime) 
  @IsNotEmpty()
  time: ProposalTime;

  @IsString()
  @IsNotEmpty()
  unity: string;

  @IsEnum(ProposalStatus)
  @IsOptional()
  prWork?: ProposalStatus;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsString()
  @IsNotEmpty()
  product: string;

  @IsString()
  @IsNotEmpty()
  activity: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  pdfUrl?: string;
}