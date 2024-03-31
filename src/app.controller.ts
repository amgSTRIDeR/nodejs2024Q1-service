import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    // setTimeout(() => {
    //   throw new Error('Error from controller');

    // }, 100)
    return this.appService.getHello();
  }
}
