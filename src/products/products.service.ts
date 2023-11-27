import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { Product } from "../schemas/products.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class ProductService {
    constructor(
        @InjectModel('Products') private readonly productModel: Model<Product>,
    ) { }

    async insertProduct(product: Product) {
        if (!product.title || !product.description || !product.price)
            throw new BadRequestException('Some params are missing. Please send all the required parameters.');
        const newProduct = await this.productModel.create(product);
        let result = await newProduct.save();
        return result._id;
    }

    async getProducts() {
        const allProducts = await this.productModel.find({}).populate({
            path: 'user',
            select: ["first_name", "last_name", "email"]
        }).lean();
        return allProducts;
    }

    async getById(id: string) {
        let singleProduct = await this.productModel.findOne({ _id: id }).populate({
            path: 'user',
            select: ["first_name", "last_name", "email"]
        }).lean();
        if (!singleProduct)
            throw new NotFoundException('Could not find product.')
        return singleProduct
    }

    async updateProduct(productId: string, title: string, description: string, price: number) {
        let singleProduct = await this.productModel.findOne({ _id: productId }).lean();
        if (!singleProduct)
            throw new NotFoundException('Could not find product.')
        let updateBody = {};
        if (title)
            updateBody['title'] = title
        if (description)
            updateBody['description'] = description
        if (price)
            updateBody['price'] = price
        let product = await this.productModel.findOneAndUpdate(
            { _id: productId },
            updateBody,
            { new: true }
        );
        return product
    }

    async deleteProduct(productId: string) {
        let result;
        let find = await this.productModel.findOne({ _id: productId }).lean();
        if (find)
            result = await this.productModel.deleteOne({ _id: productId }).lean();
        else
            throw new NotFoundException('Could not find product.')
        return 'Product Deleted Successfully!'
    }
}