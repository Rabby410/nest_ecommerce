import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";
import { HttpAdapterHost } from "@nestjs/core";


export interface HttpExceptionResponse {
    statusCode: number;
    message: string;
    error: string;
}
@Catch()
export class AllExceptionFilter implements ExceptionFilter{
    constructor(private readonly httpAdapterHost: HttpAdapterHost){}
    catch(exception: any, host: ArgumentsHost):void {
        const {httpAdapter} =this.httpAdapterHost;
        const ctx = host.switchToHttp();
        
        const httpStatus = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

        console.log('Exception :: ==> ', exception);

        const exceptionResponse = exception instanceof HttpException ? ctx.getResponse() : String(exception);

        const responseBody = {
            statusCode: httpStatus,
            timeStamp: new Date().toISOString(),
            // path: httpAdapter.getRequest(ctx.getRequest()),
            path: httpAdapter.getRequestUrl(ctx.getRequest()).url,
            message: 
            (exceptionResponse as HttpExceptionResponse).message ||
            (exceptionResponse as HttpExceptionResponse).error ||
            exceptionResponse ||
            'something Went Wrong',
            errorResponse: exceptionResponse as HttpExceptionResponse,
        };
        httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
    }
}