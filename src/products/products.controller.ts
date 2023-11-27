import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { ProductService } from "./products.service";
import { Product } from "src/schemas/products.schema";

@Controller('products')
export class ProductsController {
    constructor(private productsService: ProductService) { }
    @Post('create')
    async addProduct(
        @Body('') product: Product,
        ) {
        const genteratedId = await this.productsService.insertProduct(product);
        return { id: genteratedId };
    }

    @Get('getAll')
    async getAllProducts() {
        const products = await this.productsService.getProducts();
        return { products: products };
    }

    @Get('getById/:id')
    async getProductById(@Param('id') prodId: string) {
        const product = await this.productsService.getById(prodId);
        return { product: product };
    }

    @Patch('update/:id')
    async updateProduct(
        @Param('id') prodId: string,
        @Body('title') prodTitle: string,
        @Body('description') prodDescription: string, 
        @Body('price') prodPrice: number
        ) {
            let updatedProduct = await this.productsService.updateProduct(prodId, prodTitle, prodDescription, prodPrice);
            return {product: updatedProduct}
    }

    @Delete('delete/:id')
    async deleteProduct(
        @Param('id') prodId: string,
        ) {
            let deletedProduct = await this.productsService.deleteProduct(prodId);
            return deletedProduct
    }
}