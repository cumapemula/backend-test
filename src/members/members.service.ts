import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class MembersService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    try {
      const members = await this.prisma.members.findMany({
        select: {
          id: true,
          code: true,
          name: true,
          is_penalty: true,
          transactions: {
            where: {
              returned: false,
            },
          },
        },
        orderBy: {
          id: 'asc',
        },
      });
      return members;
    } catch (error) {
      return { message: error.message };
    }
  }

  async findOne(id: number) {
    try {
      const member = await this.prisma.members.findUnique({
        where: {
          id,
        },
      });

      return member;
    } catch (error) {
      console.error(error);
    }
  }

  async setPenalty(member_id: number, date: Date) {
    try {
      const member = await this.prisma.members.update({
        where: {
          id: member_id,
        },
        data: {
          penalty_end_date: date,
          is_penalty: true,
        },
      });

      return member;
    } catch (error) {
      return { message: error.message };
    }
  }

  async removePenalty(member_id: number) {
    try {
      const member = await this.prisma.members.update({
        where: {
          id: member_id,
        },
        data: {
          is_penalty: false,
        },
      });

      return member;
    } catch (error) {
      return { message: error.message };
    }
  }
}
