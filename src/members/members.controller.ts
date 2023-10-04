import { Controller, Get } from '@nestjs/common';
import { MembersService } from './members.service';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { Member } from './entities/member.entity';

@ApiTags('members')
@Controller('members')
export class MembersController {
  constructor(private readonly membersService: MembersService) {}

  @Get()
  @ApiOperation({ summary: 'Show all existing members' })
  @ApiOkResponse({
    description: 'Shows all active members along with a list of books borrowed',
    type: [Member],
  })
  findAll() {
    return this.membersService.findAll();
  }
}
