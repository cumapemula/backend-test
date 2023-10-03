import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { PrismaService } from 'src/prisma.service';
import { BooksService } from 'src/books/books.service';
import { MembersService } from 'src/members/members.service';

@Module({
  controllers: [TransactionsController],
  providers: [TransactionsService, PrismaService, BooksService, MembersService],
})
export class TransactionsModule {}
