import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { User } from "../schemas/user.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class UserService {
    constructor(@InjectModel('Users') private readonly userModel: Model<User>
    ) {}

    async insertUser(user: User) {
        if (!user.first_name || !user.last_name || !user.email)
            throw new BadRequestException('Some params are missing. Please send all the required parameters.');
        const newUser = await this.userModel.create(user);
        let result = await newUser.save();
        return result._id;
    }

    async getUsers() {
        const allUsers = await this.userModel.find({}).lean();
        return allUsers;
    }

    async getById(id: string) {
        let singleUser = await this.userModel.findOne({ _id: id }).lean();
        if (!singleUser)
            throw new NotFoundException('Could not find user.')
        return singleUser
    }

    async updateUser(userId: string, first_name: string, last_name: string, email: string) {
        let singleUser = await this.userModel.findOne({ _id: userId }).lean();
        if (!singleUser)
            throw new NotFoundException('Could not find user.')
        let updateBody = {};
        if (first_name)
            updateBody['first_name'] = first_name
        if (last_name)
            updateBody['last_name'] = last_name
        if (email)
            updateBody['email'] = email
        let user = await this.userModel.findOneAndUpdate(
            { _id: userId },
            updateBody,
            { new: true }
        );
        return user
    }

    async deleteUser(userId: string) {
        let result;
        let find = await this.userModel.findOne({ _id: userId }).lean();
        if (find)
            result = await this.userModel.deleteOne({ _id: userId }).lean();
        else
            throw new NotFoundException('Could not find user.')
        return 'User Deleted Successfully!'
    }
}