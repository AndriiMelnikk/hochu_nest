import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { ReportsService } from './reports.service';
import { CreateReportDto } from './dto/create-report.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { ParseObjectIdPipe } from '../../common/pipes/parse-objectid.pipe';

@ApiTags('Reports')
@Controller()
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Post('requests/:id/report')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Report request' })
  async reportRequest(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() createReportDto: Omit<CreateReportDto, 'targetType' | 'targetId'>,
    @CurrentUser() user: any,
  ) {
    return this.reportsService.create(
      {
        ...createReportDto,
        targetType: 'request' as any,
        targetId: id,
      },
      user.id,
    );
  }

  @Post('proposals/:id/report')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Report proposal' })
  async reportProposal(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() createReportDto: Omit<CreateReportDto, 'targetType' | 'targetId'>,
    @CurrentUser() user: any,
  ) {
    return this.reportsService.create(
      {
        ...createReportDto,
        targetType: 'proposal' as any,
        targetId: id,
      },
      user.id,
    );
  }
}

