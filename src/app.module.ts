import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import {MongooseModule} from '@nestjs/mongoose'
import { UserModule } from './user/user.module';

@Module({
  imports: [UserModule,ProductsModule, MongooseModule.forRoot('mongodb://localhost:27017/nestjs-demo')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
