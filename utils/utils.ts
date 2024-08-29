import { ImageTypeFor } from "@/data/enum"
import { DataProductsType } from "@/data/type";

export const getImageBasedOnType = (type: ImageTypeFor, data: DataProductsType) => {
    switch(type) {
        case ImageTypeFor.mobile: 
            return data.mobile_path;
        case ImageTypeFor.tablet: 
            return data.tablet_path;
        case ImageTypeFor.thumbnail: 
            return data.thumbnail_path
        default:
            return data.desktop_path
    }
}