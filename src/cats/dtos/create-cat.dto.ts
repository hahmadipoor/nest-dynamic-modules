
import { IsString, IsInt } from 'class-validator';

export class CreateCatDto {
    
    //@IsString() //We either need to use the class-validator or the zodschema validator
    name: string;
    
    //@IsInt()
    age: number;
    
    //@IsString()
    breed: string;
  }
  