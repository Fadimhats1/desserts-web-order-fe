import { dataProducts } from "./data";
import { ImageTypeFor } from "./enum";

export type DataProductsType = (typeof dataProducts)[number]

export type TDataCart = {
    id: number,
    isSelected: boolean,
    quantity: number,
}

export type TCartCollection = {
    [key: string]: TDataCart
}