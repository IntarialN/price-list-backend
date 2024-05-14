import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {ILike, Repository} from 'typeorm';
import { EItem } from "@config/db/entities/item.entity";
import {ItemErrorResponse, ItemFindResponse} from "@modules/item/typings";

@Injectable()
export class ItemService {
    constructor(
        @InjectRepository(EItem)
        private repository: Repository<EItem>
    ) {}

    public async getItems(page: number, itemsPerPage: number, sort?: { [key in 'price' | 'name']: 'ASC' | 'DESC' }, searchName?: string): Promise<ItemFindResponse> {
        try {
            const [items, total] = await this.repository.findAndCount({
                where: searchName ? { name: ILike(`%${searchName}%`) } : {},
                skip: (page - 1) * itemsPerPage,
                take: itemsPerPage,
                order: sort ?? {}
            });

            return { items, pages: Math.ceil(total / itemsPerPage) };
        } catch (e) {
            console.error('Ошибка при получении товаров (EItem)', e);
            return { items: [], pages: 0 };
        }
    }

    public async createItem(name: string, price?: number): Promise<EItem | ItemErrorResponse> {
        const item = new EItem();

        const candidate = await this.repository.findOne({ where: { name } });

        if (candidate) {
            return { message: 'Товар с таким именем уже существует', id: candidate.id }
        }

        item.name = name;
        item.price = price;

        try {
            await this.repository.save(item);
            return item
        } catch (e) {
            console.error('Ошибка при создании товара (EItem)', e);
            return null;
        }
    }

    public async updateItem(id: number, name?: string, price?: number): Promise<EItem | ItemErrorResponse> {
        try {
            const item = await this.repository.findOne({ where: { id } });

            if (!item) {
                return { id, message: 'Не найден товар, который нужно изменить' };
            }

            if (!price && !name) {
                return { id, message: 'Для изменения нужно указать либо новую цену, либо новое имя' };
            }

            item.name = name ?? item.name;
            item.price = price ?? item.price;

            await this.repository.save(item);
            return item;
        } catch (e) {
            console.error('Ошибка при обновлении товара (EItem)', e);
            return { id, message: 'Серверная ошибка при редактировании товара' }
        }
    }

    public async removeItem(id: number): Promise<boolean> {
        try {
            await this.repository.delete(id);
            return true;
        } catch (e) {
            console.error('Ошибка при обновлении товара (EItem)', e);
            return false
        }
    }
}