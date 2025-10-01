import { IsEnum, IsOptional, IsString } from 'class-validator';
import { QuotationStatus } from '@prisma/client';

// Define los campos que se pueden actualizar. Son opcionales.
export class UpdateQuotationDto {
  @IsEnum(QuotationStatus)
  @IsOptional()
  status?: QuotationStatus;

  @IsString()
  @IsOptional()
  pdfUrl?: string;
}