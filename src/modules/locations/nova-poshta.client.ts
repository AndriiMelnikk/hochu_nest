import {
  BadRequestException,
  Injectable,
  Logger,
  ServiceUnavailableException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

interface NovaPoshtaRequest {
  modelName: string;
  calledMethod: string;
  methodProperties?: Record<string, unknown>;
}

interface NovaPoshtaResponse<T> {
  success: boolean;
  data: T;
  errors: string[];
  warnings: string[];
  info: string[];
  message?: string[];
}

@Injectable()
export class NovaPoshtaClient {
  private readonly logger = new Logger(NovaPoshtaClient.name);
  private readonly apiUrl: string;
  private readonly apiKey: string;

  constructor(private readonly configService: ConfigService) {
    this.apiUrl =
      this.configService.get<string>('novaPoshta.apiUrl') || 'https://api.novaposhta.ua/v2.0/json/';
    this.apiKey = this.configService.get<string>('novaPoshta.apiKey') || '';
  }

  async call<T>(payload: NovaPoshtaRequest): Promise<T> {
    if (!this.apiKey) {
      throw new ServiceUnavailableException({
        message: 'Nova Poshta API is not configured',
        code: 'NOVA_POSHTA_NOT_CONFIGURED',
      });
    }

    let response: Response;
    try {
      response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ apiKey: this.apiKey, ...payload }),
      });
    } catch (error) {
      this.logger.error('Nova Poshta API network error', error);
      throw new ServiceUnavailableException({
        message: 'Nova Poshta API is unavailable',
        code: 'NOVA_POSHTA_UNAVAILABLE',
      });
    }

    if (!response.ok) {
      throw new ServiceUnavailableException({
        message: 'Nova Poshta API request failed',
        code: 'NOVA_POSHTA_HTTP_ERROR',
        details: { status: response.status },
      });
    }

    const data = (await response.json()) as NovaPoshtaResponse<T>;
    if (!data.success) {
      throw new BadRequestException({
        message: 'Nova Poshta API error',
        code: 'NOVA_POSHTA_ERROR',
        details: {
          errors: data.errors,
          warnings: data.warnings,
          info: data.info,
          message: data.message,
        },
      });
    }

    return data.data;
  }
}
