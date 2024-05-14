import {Body, Controller, Post, Get, Query, Param, Patch, Delete} from '@nestjs/common';
import { ItemService } from './item.service';
import {ItemErrorResponse, ItemFindResponse} from "@modules/item/typings";
import {EItem} from "@config/db/entities/item.entity";

@Controller('items')
export class ItemController {
    constructor(private readonly itemService: ItemService) {}

    @Get()
    async getItems(
        @Query('page') page: number,
        @Query('itemsPerPage') itemsPerPage: number,
        @Query('sort') sort?: string,
        @Query('searchName') searchName?: string
    ): Promise<ItemFindResponse> {
        const parsedSort = sort ? JSON.parse(sort) : null;
        return this.itemService.getItems(page, itemsPerPage, parsedSort, searchName);
    }

    @Post()
    async createItem(
        @Body('name') name: string,
        @Body('price') price?: number
    ): Promise<EItem | ItemErrorResponse> {
        return this.itemService.createItem(name, price);
    }

    @Patch(':id')
    async updateItem(
        @Param('id') id: number,
        @Body('name') name?: string,
        @Body('price') price?: number
    ): Promise<EItem | ItemErrorResponse> {
        return this.itemService.updateItem(id, name, price);
    }

    @Delete(':id')
    async removeItem(
        @Param('id') id: number
    ): Promise<boolean> {
        return this.itemService.removeItem(id);
    }
}
