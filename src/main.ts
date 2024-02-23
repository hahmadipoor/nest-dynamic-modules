import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { logger } from './middlewares/logger.middleware2';
import { HttpExceptionFilter } from './custom-errors/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { 
    abortOnError: false,//By default, if any error happens while creating the application your app will exit with the code 1. If you want to make it throw an error instead disable the option
    //bodyParser:false //NestJS will register json and urlencoded by  default. In case we want to customize json and urlencoded   
  });
  //app.use(logger)//In case we want to apply the logger middleware here, insted of configuring in AppModule class
  await app.listen(3000);
}
bootstrap();
