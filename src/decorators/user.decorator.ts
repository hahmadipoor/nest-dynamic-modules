import { createParamDecorator, ExecutionContext } from '@nestjs/common';

//In the node.js world, it's common practice to attach properties to the request object. 
//Then you manually extract them in each route handler, using code like the following:
//In order to make your code more readable and transparent, you can create a @User() decorator 
//and reuse it across all of your controllers.
export const User = createParamDecorator(
    (data: string, ctx: ExecutionContext) => {
      const request = ctx.switchToHttp().getRequest();
      const user = request.user;
  
      return data ? user?.[data] : user;
    },
);