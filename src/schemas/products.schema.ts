// import * as mongoose from 'mongoose';
// import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
// @Schema({
//     timestamps: true
// })
// export class Product extends mongoose.Document {
//     @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
//     user: User

//     @Prop({required: [true, 'Title is required.']})
//     title: string

//     @Prop({required: [true, 'Description is required.']})
//     description: string

//     @Prop({required: [true, 'Price is required.']})
//     price: number
// }

// export const ProductSchema = SchemaFactory.createForClass(Product);

export const ProductSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true }
},{
    timestamps: true
})

export interface Product {
    id: string,
    title: string,
    description: string,
    price: number
}