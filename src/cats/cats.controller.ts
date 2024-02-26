import { Body, Controller, Delete, Get, Param, Post, Put, Res, HttpException, HttpStatus, BadRequestException, UseFilters, ParseIntPipe, UsePipes, UseGuards, UseInterceptors,} from '@nestjs/common';
import { Response } from 'express';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dtos/create-cat.dto';
import { UpdateCatDto } from './dtos/update-cat.dto';
import { Cat } from './schemas/cat.schema';

@Controller('cats')
export class CatsController {

    constructor(private readonly catsService:CatsService){

    }

    @Post()
    
    async create(@Body() createCatDto: CreateCatDto):Promise<Cat> {
        return await this.catsService.create(createCatDto);
    }
    
    @Get('cross-platform')
    async findAllCrossPlatform():Promise<any[]> {
        return this.catsService.findAllCrossPlatform();
    }

    @Get('platform-specific')
    async findAllPlatformSpecific(@Res() res:Response) {
        const result=await this.catsService.findAllPlatformSpecific()
        res.status(HttpStatus.OK).json(result);
    }

    @Get(':id')
    findOne(@Param('id',ParseIntPipe) id: number):string {
        return `This action returns a #${id} cat`;
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
        return `This action updates a #${id} cat`;
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return `This action removes a #${id} cat`;
    }
}
