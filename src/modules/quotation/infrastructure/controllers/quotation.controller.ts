import { Controller, Post, Body, Param, ParseIntPipe } from '@nestjs/common';
import { CreateQuotationUseCase } from '../../application/use-cases/create.quotation.usecase';
import { AddStevedoreToQuotationUseCase } from '../../application/use-cases/add.stevedore.to.quotation.usecase';
import { CreateQuotationDto } from '../../application/dtos/create.quotation.dto';
import { AddStevedoreDto } from '../../application/dtos/add.stevedore.dto';

@Controller('quotations')
export class QuotationController {
  constructor(
    private readonly createQuotationUseCase: CreateQuotationUseCase,
    private readonly addStevedoreUseCase: AddStevedoreToQuotationUseCase,
  ) {}

  @Post()
  create(@Body() createQuotationDto: CreateQuotationDto) {
    return this.createQuotationUseCase.execute(createQuotationDto);
  }

  @Post(':id/stevedores')
  addStevedore(
    @Param('id', ParseIntPipe) quotationId: number,
    @Body() addStevedoreDto: AddStevedoreDto,
  ) {
    return this.addStevedoreUseCase.execute(quotationId, addStevedoreDto.stevedoreId);
  }
}