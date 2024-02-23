import {  BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCatDto } from './dtos/create-cat.dto';
import { Cat } from './schemas/cat.schema';

@Injectable()
export class CatsService {

  constructor(@InjectModel(Cat.name) private readonly catModel: Model<Cat>) {

  }
  
  async create(createCatDto: CreateCatDto): Promise<Cat> {
    const createdCat = await this.catModel.create(createCatDto);
    return createdCat;
  }

  async findAllCrossPlatform():Promise<any[]>{

    /*throw new BadRequestException('Something bad happened', { //using nest built-in exceptions 
      cause: new Error(), 
      description: 'Some error description' 
    })*/
    return await this.catModel.find()
  }

  async findAllPlatformSpecific():Promise<any[]>{
    //throw new ForbiddenException()//Custom Error
    return this.catModel.find()
  }

}
