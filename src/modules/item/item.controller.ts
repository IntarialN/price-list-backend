import {Body, Controller, Post, Get, Query, Param, Patch, Delete} from '@nestjs/common';
import { ItemService } from './item.service';

@Controller('items')
export class ItemController {
    constructor(private readonly itemService: ItemService) {}

    @Get()
    async getItems(
        @Query('page') page: number,
        @Query('itemsPerPage') itemsPerPage: number,
        @Query('sort') sort?: string,
        @Query('searchName') searchName?: string
    ) {
        const parsedSort = sort ? JSON.parse(sort) : null;
        return this.itemService.getItems(page, itemsPerPage, parsedSort, searchName);
    }

    @Post()
    async createItem(
        @Body('name') name: string,
        @Body('price') price?: number
    ) {
        return this.itemService.createItem(name, price);
    }

    @Patch(':id')
    async updateItem(
        @Param('id') id: number,
        @Body('name') name?: string,
        @Body('price') price?: number
    ) {
        return this.itemService.updateItem(id, name, price);
    }

    @Delete(':id')
    async removeItem(
        @Param('id') id: number
    ) {
        return this.itemService.removeItem(id);
    }
}
