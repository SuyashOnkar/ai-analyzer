import { Body, Controller, Get, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('search')
  @UseInterceptors(FileInterceptor('file'))
  async search(@UploadedFile() file: Express.Multer.File, @Body('query') query: string) {
    return this.appService.performLLMSearch(file, query);
  }
}
