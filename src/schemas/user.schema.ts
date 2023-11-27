import * as mongoose from 'mongoose';
// import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';

// @Schema({
//     timestamps: true
// })
// export class User extends mongoose.Document {
//     @Prop({required: [true, 'Title is required.']})
//     first_name: string

//     @Prop({required: [true, 'Description is required.']})
//     last_name: string

//     @Prop({required: [true, 'Email is required.'], unique: [true, 'Email must be unique.']})
//     email: string
// }

// export const UserSchema = SchemaFactory.createForClass(User);

export const UserSchema = new mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true }
},{
    timestamps: true
})

export interface User {
    id: string,
    first_name: string,
    last_name: string,
    email: string
}