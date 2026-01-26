import { Injectable } from '@nestjs/common';
import { GetWarehousesDto } from './dto/get-warehouses.dto';
import { SearchCitiesDto } from './dto/search-cities.dto';
import { NovaPoshtaClient } from './nova-poshta.client';

interface NovaPoshtaCitySearchResult {
  TotalCount: number;
  Addresses: NovaPoshtaCityAddress[];
}

interface NovaPoshtaCityAddress {
  Present: string;
  MainDescription: string;
  AreaDescription: string;
  RegionDescription: string;
  SettlementTypeDescription: string;
  Ref: string;
  DeliveryCity: string;
}

interface NovaPoshtaWarehouse {
  Ref: string;
  Description: string;
  ShortAddress?: string;
  TypeOfWarehouse: string;
  Number: string;
  CityRef: string;
  CityDescription: string;
  SettlementAreaDescription: string;
  SettlementRegionsDescription: string;
  SettlementTypeDescription: string;
  Latitude: string;
  Longitude: string;
}

@Injectable()
export class LocationsService {
  constructor(private readonly novaPoshtaClient: NovaPoshtaClient) {}

  async searchCities(query: SearchCitiesDto) {
    const data = await this.novaPoshtaClient.call<NovaPoshtaCitySearchResult[]>({
      modelName: 'Address',
      calledMethod: 'searchSettlements',
      methodProperties: {
        CityName: query.query,
        Limit: query.limit,
      },
    });

    const result = data[0];
    const items = (result?.Addresses || []).map((address) => ({
      ref: address.Ref,
      name: address.Present,
      mainDescription: address.MainDescription,
      settlementType: address.SettlementTypeDescription,
      area: address.AreaDescription,
      region: address.RegionDescription,
      deliveryCityRef: address.DeliveryCity,
    }));

    const total = result?.TotalCount ? Number(result.TotalCount) : items.length;

    return {
      data: items,
      meta: {
        total,
        source: 'nova-poshta',
      },
    };
  }

  async getWarehouses(query: GetWarehousesDto) {
    const data = await this.novaPoshtaClient.call<NovaPoshtaWarehouse[]>({
      modelName: 'Address',
      calledMethod: 'getWarehouses',
      methodProperties: {
        CityRef: query.cityRef,
        FindByString: query.search,
        Limit: query.limit,
      },
    });

    const items = data.map((warehouse) => ({
      ref: warehouse.Ref,
      description: warehouse.Description,
      shortAddress: warehouse.ShortAddress,
      type: warehouse.TypeOfWarehouse,
      number: warehouse.Number,
      cityRef: warehouse.CityRef,
      cityName: warehouse.CityDescription,
      area: warehouse.SettlementAreaDescription,
      region: warehouse.SettlementRegionsDescription,
      settlementType: warehouse.SettlementTypeDescription,
      location: {
        latitude: warehouse.Latitude,
        longitude: warehouse.Longitude,
      },
    }));

    return {
      data: items,
      meta: {
        total: items.length,
        source: 'nova-poshta',
      },
    };
  }
}
