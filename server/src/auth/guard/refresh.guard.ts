import { ExecutionContext, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class RefreshGuard extends AuthGuard( "refresh" ) {
   canActivate( context: ExecutionContext ) {
      return super.canActivate( context );
   }

   handleRequest( err, data ) {
      if ( err || !data ) throw new HttpException( "Invalid or expired token", HttpStatus.UNAUTHORIZED );
      return data;
   }

}