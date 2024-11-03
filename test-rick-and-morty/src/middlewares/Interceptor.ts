import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable, tap } from "rxjs";

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    
    const queryName = context.getArgs()[3]?.fieldName;

    console.log(`[middleware] ==>> Before operationName ${queryName}...`);

    const now = Date.now();
    
    return next
      .handle()
      .pipe(
        tap(() => console.log(`[middleware] ==>> After... ${queryName} ${Date.now() - now}ms`)),
      );
  }
}