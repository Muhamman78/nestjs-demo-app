import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { User } from "src/schemas/user.schema";

@Controller('users')
export class UserController {
    constructor(private userService: UserService) { }
    @Post('create')
    async addUser(
        @Body('') product: User,
        ) {
        const genteratedId = await this.userService.insertUser(product);
        return { id: genteratedId };
    }

    @Get('getAll')
    async getAllUsers() {
        const users = await this.userService.getUsers();
        return { users: users };
    }

    @Get('getById/:id')
    async getUserById(@Param('id') prodId: string) {
        const user = await this.userService.getById(prodId);
        return { user };
    }

    @Patch('update/:id')
    async updateUser(
        @Param('id') userId: string,
        @Body('title') first_name: string,
        @Body('description') last_name: string, 
        @Body('price') email: string
        ) {
            let updatedUser = await this.userService.updateUser(userId, first_name, last_name, email);
            return {user: updatedUser}
    }

    @Delete('delete/:id')
    async deleteUser(
        @Param('id') prodId: string,
        ) {
            let deletedProduct = await this.userService.deleteUser(prodId);
            return deletedProduct
    }
}