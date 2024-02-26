import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { MongooseModule } from '@nestjs/mongoose';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { HttpExceptionFilter } from './custom-errors/http-exception.filter';
import { APP_FILTER } from '@nestjs/core';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from './config/config.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/nest-practice'),
    CatsModule,
    UsersModule,
    AuthModule, // static module binding
    ConfigModule.register({ folder: './config' }) // dyanamic module binding
  ],
  controllers: [AppController],
  providers: [AppService], 
})
export class AppModule {
  
}


