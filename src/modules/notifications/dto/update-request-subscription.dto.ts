import { PartialType } from '@nestjs/swagger';
import { CreateRequestSubscriptionDto } from './create-request-subscription.dto';

export class UpdateRequestSubscriptionDto extends PartialType(CreateRequestSubscriptionDto) {}
