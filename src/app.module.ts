import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { MongooseModule } from '@nestjs/mongoose';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { CatsController } from './cats/cats.controller';
import { logger } from './middlewares/logger.middleware2';
import helmet from 'helmet';
import { HttpExceptionFilter } from './custom-errors/http-exception.filter';
import { APP_FILTER } from '@nestjs/core';


@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/nest-practice'),
    CatsModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {//providing the global Exception Filter for all routes and end points
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ]
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(helmet(),logger)//function-based middleware
      //.apply(LoggerMiddleware)//class-based middlware
      /*.exclude(
        { path: 'cats', method: RequestMethod.GET },
        { path: 'cats', method: RequestMethod.POST },
        'cats/(.*)',
      )*/
      //.forRoutes('cats');//apply the middleware for all routs in cats controller 
      //.forRoutes({ path: 'cats/*', method: RequestMethod.GET })//apply the middleware only for GET requests
      .forRoutes(CatsController);//apply the middleware to all routes in the CatsController
  }
}


