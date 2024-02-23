import { Body, Controller, Delete, Get, Param, Post, Put, Res, HttpException, HttpStatus, BadRequestException, UseFilters, ParseIntPipe, UsePipes, UseGuards, UseInterceptors,} from '@nestjs/common';
import { Response } from 'express';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dtos/create-cat.dto';
import { UpdateCatDto } from './dtos/update-cat.dto';
import { Cat } from './schemas/cat.schema';
import { HttpExceptionFilter } from 'src/custom-errors/http-exception.filter';
import { ZodValidationPipe, createCatSchema } from 'src/validation-pips/validation-pip';
import { RolesGuard } from 'src/Guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { LoggingInterceptor } from 'src/interceptors/logging.interceptor';
import { User } from 'src/decorators/user.decorator';

@Controller('cats')
@UseInterceptors(LoggingInterceptor)
// In order to bind the interceptor, we use the @UseInterceptors() decorator imported from the 
// @nestjs/common package. Like pipes and guards, interceptors can be controller-scoped, method-scoped, 
//or global-scoped.
@UseGuards(RolesGuard)// We use the decorator to bindin the guard that we have defined 
//Guards are executed after all middlewares, but before pips and interceptors. 
export class CatsController {

    constructor(private readonly catsService:CatsService){

    }

    @Post()
    
    @UseFilters(HttpExceptionFilter)// Binding the validation pipe into this route handler
    @UsePipes(new ZodValidationPipe(createCatSchema))
    //@Roles(['admin'])
    async create(@Body() createCatDto: CreateCatDto,/*@User() user: UserEntity*/):Promise<Cat> {
        if(createCatDto.name.length==0){
            throw new BadRequestException();
        }
        return await this.catsService.create(createCatDto);
    }
    
    @Get('cross-platform')
    async findAllCrossPlatform():Promise<any[]> {
        try {
            return this.catsService.findAllCrossPlatform();
        } catch (error) { //throwing an overridden exception for learning
            throw new HttpException({
              status: HttpStatus.FORBIDDEN,
              error: 'This is a custom message',
            }, HttpStatus.FORBIDDEN, {
              cause: error
            });
        }
    }

    @Get('platform-specific')
    async findAllPlatformSpecific(@Res() res:Response) {
        const result=await this.catsService.findAllPlatformSpecific()
        res.status(HttpStatus.OK).json(result);
    }

    @Get(':id')
    findOne(@Param('id',ParseIntPipe/*binding the transformation pipe*/) id: number):string {
        //the transformation pipe converts '123' to 123, but if request is localhost/cats/abc it's gonna throw error
        return `This action returns a #${id} cat`;
    }

    @Put(':id')
    update(@Param('id',new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) id: string, @Body() updateCatDto: UpdateCatDto) {
        // In this case we have instantiated the transformation pipe manually, instead of leaving this job to the framework. That's because we 
        // wanted to pass custom error to it. 
        return `This action updates a #${id} cat`;
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return `This action removes a #${id} cat`;
    }
}
