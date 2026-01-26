import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetWarehousesDto } from './dto/get-warehouses.dto';
import { SearchCitiesDto } from './dto/search-cities.dto';
import { LocationsService } from './locations.service';

@ApiTags('Locations')
@Controller('locations')
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  @Get('cities')
  @ApiOperation({ summary: 'Search cities (Nova Poshta)' })
  @ApiResponse({ status: 200, description: 'List of cities' })
  async searchCities(@Query() query: SearchCitiesDto) {
    return this.locationsService.searchCities(query);
  }

  @Get('warehouses')
  @ApiOperation({ summary: 'Get warehouses by city (Nova Poshta)' })
  @ApiResponse({ status: 200, description: 'List of warehouses' })
  async getWarehouses(@Query() query: GetWarehousesDto) {
    return this.locationsService.getWarehouses(query);
  }
}
