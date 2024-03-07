import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class UserResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        if (Array.isArray(data)) {
          return data.map((user) => {
            return this.removePassword(user);
          });
        } else {
          return this.removePassword(data);
        }
      }),
    );
  }

  private removePassword(user: any): any {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}
