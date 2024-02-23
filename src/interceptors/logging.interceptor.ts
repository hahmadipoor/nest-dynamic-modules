
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Before...');

    const now = Date.now();
    return next
      .handle()
      .pipe(tap(() => console.log(`After... ${Date.now() - now}ms`)),);
  }
  //   Since handle() returns an RxJS Observable, we have a wide choice of operators we can use to manipulate 
  //   the stream. In the example above, we used the tap() operator, which invokes our anonymous logging 
  //   function upon graceful or exceptional termination of the observable stream, but doesn't otherwise 
  //   interfere with the response cycle
}
