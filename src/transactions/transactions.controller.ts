import { Controller, Post, Body, Patch } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import {
  ApiTags,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { Transaction } from './entities/transaction.entity';

@ApiTags('transactions')
@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  @ApiOperation({ summary: 'Create book loan transaction' })
  @ApiCreatedResponse({
    description: 'Created transaction object as response',
    type: Transaction,
  })
  create(@Body() dto: CreateTransactionDto) {
    return this.transactionsService.create(dto);
  }

  @Patch()
  @ApiOperation({ summary: 'Create book return transaction' })
  @ApiOkResponse({
    description: 'Updated transaction object as response',
    type: Transaction,
  })
  update(@Body() dto: UpdateTransactionDto) {
    return this.transactionsService.returnBook(dto);
  }
}
