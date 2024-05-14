import {EItem} from "@modules/item/models/item.entity";

export interface ItemErrorResponse {
    id: number;
    message: string;
}

export interface ItemFindResponse {
    items: EItem[],
    pages: number
}