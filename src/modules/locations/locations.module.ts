import { Module } from '@nestjs/common';
import { LocationsController } from './locations.controller';
import { LocationsService } from './locations.service';
import { NovaPoshtaClient } from './nova-poshta.client';

@Module({
  controllers: [LocationsController],
  providers: [LocationsService, NovaPoshtaClient],
})
export class LocationsModule {}
