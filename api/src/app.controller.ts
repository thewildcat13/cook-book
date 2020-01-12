import { Controller, Get, Post, Put, Param, Body } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    getCookList() {
        return this.appService.getCookList();
    }

    @Post()
    createCook(@Body() data) {
        return this.appService.addCook(data);
    }

    @Put(':id')
    updateCook(@Param('id') id, @Body() data) {
        return this.appService.editCook(id, data);
    }
}
