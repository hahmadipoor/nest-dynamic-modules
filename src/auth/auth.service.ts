import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {

    // we can inject UsersService instance in our AuthService, 
    // because it's exported by its hosting module (UsersModule)
    // and its hosting module is imported by the consumer module (AuthModule)
    constructor(private readonly usersService: UsersService){    
    }
}
