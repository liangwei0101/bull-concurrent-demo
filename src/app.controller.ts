import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('/test')
export class AppController {
  constructor(private appService: AppService) { }

  @Get()
  async getHello() {
    return this.appService.getHello();
  }
}
