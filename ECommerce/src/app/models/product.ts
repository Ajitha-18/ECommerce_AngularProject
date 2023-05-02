export interface Product{
    id: number;
    name: string;
    description: string;
    price: number;
    isActive: boolean;
    categoryId: number;
    productImages: ProductImages[];
}

export interface ProductImages{
    id: number;
    base64Image: string;
    imageName: string;
    productId: number;
}