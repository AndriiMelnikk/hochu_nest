import { registerAs } from '@nestjs/config';

export default registerAs('novaPoshta', () => ({
  apiUrl: process.env.NOVA_POSHTA_API_URL || 'https://api.novaposhta.ua/v2.0/json/',
  apiKey: process.env.NOVA_POSHTA_API_KEY || 'bb0dac4a8b36025d3c7c182b33687bf7',
}));
