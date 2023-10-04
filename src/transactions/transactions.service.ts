import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { PrismaService } from 'src/prisma.service';
import { BooksService } from 'src/books/books.service';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { getTimeDifference } from 'src/utils/getTimeDifference';
import { setPenalty } from 'src/utils/setPenaltyDate';
import { MembersService } from 'src/members/members.service';

@Injectable()
export class TransactionsService {
  constructor(
    private prisma: PrismaService,
    private bookServices: BooksService,
    private memberService: MembersService,
  ) {}

  async create(dto: CreateTransactionDto) {
    const checkPenalty = await this.memberService.findOne(dto.member_id);
    const today = new Date();
    const timeDifferences = getTimeDifference(
      today,
      checkPenalty.penalty_end_date,
    );
    if (checkPenalty.is_penalty && timeDifferences.day >= 0) {
      await this.memberService.removePenalty(dto.member_id);
      return {
        message: 'You are still under sentence',
      };
    }

    const checkStock = await this.bookServices.findOne(dto.book_id);
    if (checkStock.stock === 0) {
      return {
        message: 'the book is not available',
      };
    }

    const checkTotalBorrows = await this.findOne(dto.member_id);
    if (checkTotalBorrows.length === 2) {
      return {
        message: 'You have reached the total amount of borrow',
      };
    }

    try {
      const created = await this.prisma.transactions.create({
        data: {
          ...dto,
        },
      });
      if (created) {
        this.bookServices.reduceStock(dto.book_id);
      }
      return created;
    } catch (error) {
      console.error(error);
    }
  }

  async findOne(member_id: number) {
    try {
      const transaction = await this.prisma.transactions.findMany({
        where: {
          member_id,
          returned: false,
        },
      });
      return transaction;
    } catch (error) {
      console.error(error);
    }
  }

  async returnBook(dto: UpdateTransactionDto) {
    try {
      const checkTransaction = await this.prisma.transactions.findFirstOrThrow({
        where: {
          returned: false,
          ...dto,
        },
      });

      const updated = await this.prisma.transactions.update({
        where: {
          id: checkTransaction.id,
        },
        data: {
          return_date: new Date(),
          returned: true,
        },
      });

      await this.bookServices.increaseStock(updated.book_id);

      const checkDateDifferences = getTimeDifference(
        updated.return_date,
        updated.borrowing_date,
      );

      if (
        checkDateDifferences.day > 7 ||
        checkDateDifferences.month > 0 ||
        checkDateDifferences.year > 0
      ) {
        const penaltyDate = setPenalty(3);
        // eslint-disable-next-line prettier/prettier
        const date = `${penaltyDate.getFullYear()}-${penaltyDate.getMonth() + 1}-${penaltyDate.getDate()}`;
        await this.memberService.setPenalty(updated.member_id, penaltyDate);
        return {
          message: `You will be banned from borrowing books until ${date} because you have exceeded the maximum return limit`,
          data: updated,
        };
      }

      return updated;
    } catch (error) {
      return { message: error.message };
    }
  }
}
