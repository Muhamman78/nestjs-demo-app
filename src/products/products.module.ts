import { Module } from "@nestjs/common";
import { ProductsController } from "./products.controller";
import { ProductService } from "./products.service";
import { MongooseModule } from "@nestjs/mongoose";
import { ProductSchema } from "../schemas/products.schema";

@Module({
    imports: [MongooseModule.forFeature([{name: 'Products', schema: ProductSchema}])],
    controllers: [ProductsController],
    providers: [ProductService]
})
export class ProductsModule {}