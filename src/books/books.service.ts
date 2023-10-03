import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class BooksService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    try {
      const books = await this.prisma.books.findMany({
        where: {
          stock: {
            gt: 0,
          },
        },
        orderBy: {
          id: 'asc',
        },
      });
      return books;
    } catch (error) {
      return { message: error.message };
    }
  }

  async findOne(book_id: number) {
    try {
      const book = await this.prisma.books.findUnique({
        where: { id: book_id },
      });
      return book;
    } catch (error) {
      console.error(error);
    }
  }

  async reduceStock(book_id: number) {
    try {
      await this.prisma.books.update({
        where: { id: book_id },
        data: {
          stock: 0,
        },
      });
    } catch (error) {
      console.error(error);
    }
  }

  async increaseStock(book_id: number) {
    try {
      await this.prisma.books.update({
        where: { id: book_id },
        data: {
          stock: 1,
        },
      });
    } catch (error) {
      console.error(error);
    }
  }
}
