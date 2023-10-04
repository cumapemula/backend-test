import { Test, TestingModule } from '@nestjs/testing';
import { MembersService } from './members.service';
import { PrismaService } from 'src/prisma.service';
import { memberSeed } from '../../prisma/seeders/members';

const oneMember = memberSeed[0];

const dbMock = {
  members: {
    findMany: jest.fn().mockResolvedValue(memberSeed),
    findUnique: jest.fn().mockResolvedValue(oneMember),
    update: jest.fn().mockResolvedValue(oneMember),
  },
};

describe('MembersService', () => {
  let service: MembersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MembersService,
        {
          provide: PrismaService,
          useValue: dbMock,
        },
      ],
    }).compile();

    service = module.get<MembersService>(MembersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return an array of members', async () => {
    expect(await service.findAll()).toEqual(memberSeed);
  });

  it('should return one member', async () => {
    const id = 1;
    expect(await service.findOne(id)).toEqual(oneMember);
  });

  it('should return updated member', async () => {
    const id = 1;
    const date = new Date();
    expect(await service.setPenalty(id, date)).toEqual(oneMember);
  });

  it('should return updated member', async () => {
    const id = 1;
    expect(await service.removePenalty(id)).toEqual(oneMember);
  });
});
