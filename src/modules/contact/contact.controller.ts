import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ContactService } from './contact.service';
import { ContactDto } from './dto/contact.dto';

@ApiTags('Contact')
@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Submit contact form' })
  @ApiBody({ type: ContactDto })
  @ApiResponse({ status: 200, description: 'Contact form submitted successfully' })
  @ApiResponse({ status: 400, description: 'Validation error' })
  async submit(@Body() contactDto: ContactDto) {
    return this.contactService.submitContactForm(contactDto);
  }
}
