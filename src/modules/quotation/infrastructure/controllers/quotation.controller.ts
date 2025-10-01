import { Controller, Post, Body, Param, ParseIntPipe, Get, Patch, Delete, HttpCode } from '@nestjs/common';
import { CreateQuotationDto } from '../../application/dtos/create.quotation.dto';
import { AddStevedoresDto } from '../../application/dtos/add.stevedore.dto';
import { UpdateQuotationDto } from '../../application/dtos/update.quotation.dto';
import { CreateQuotationUseCase } from '../../application/use-cases/create.quotation.usecase';
import { AddStevedoresToQuotationUseCase } from '../../application/use-cases/add.stevedore.to.quotation.usecase';
import { ListQuotationsUseCase } from '../../application/use-cases/list.quotations.usecase';
import { GetQuotationByIdUseCase } from '../../application/use-cases/get.quotation.by.id.usecase';
import { UpdateQuotationUseCase } from '../../application/use-cases/update.quotation.usecase';
import { DeleteQuotationUseCase } from '../../application/use-cases/delete.quotation.usecase';

@Controller('quotations')
export class QuotationController {
  constructor(
    private readonly createQuotationUseCase: CreateQuotationUseCase,
    private readonly addStevedoresUseCase: AddStevedoresToQuotationUseCase,
    private readonly listQuotationsUseCase: ListQuotationsUseCase,
    private readonly getQuotationByIdUseCase: GetQuotationByIdUseCase,
    private readonly updateQuotationUseCase: UpdateQuotationUseCase,
    private readonly deleteQuotationUseCase: DeleteQuotationUseCase,
  ) {}

  @Post()
  create(@Body() createQuotationDto: CreateQuotationDto) {
    return this.createQuotationUseCase.execute(createQuotationDto);
  }

  @Post(':id/stevedores')
  addStevedores(
    @Param('id', ParseIntPipe) quotationId: number,
    @Body() addStevedoresDto: AddStevedoresDto,
  ) {
    return this.addStevedoresUseCase.execute(quotationId, addStevedoresDto.stevedoreIds);
  }

  @Get()
  findAll() {
    return this.listQuotationsUseCase.execute();
  }

  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.getQuotationByIdUseCase.execute(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateQuotationDto: UpdateQuotationDto) {
    return this.updateQuotationUseCase.execute(id, updateQuotationDto);
  }

  @Delete(':id')
  @HttpCode(204) // Estándar para una eliminación exitosa
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.deleteQuotationUseCase.execute(id);
  }
}