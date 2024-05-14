import {EItem} from "@config/db/entities/item.entity";

export interface ItemErrorResponse {
    id: number;
    message: string;
}

export interface ItemFindResponse {
    items: EItem[],
    pages: number
}