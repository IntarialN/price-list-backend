import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemService } from './item.service';
import { EItem } from "@config/db/entities/item.entity";
import { ItemController } from "@modules/item/item.controller";

@Module({
    imports: [TypeOrmModule.forFeature([EItem])],
    controllers: [ItemController],
    providers: [ItemService],
    exports: [ItemService],
})
export class ItemModule {}
