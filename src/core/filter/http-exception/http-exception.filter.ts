import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp(); // 获取请求上下文
    const response = ctx.getResponse();
    const status = exception.getStatus(); //获取异步状态码
    // 设置错误信息
    const message = exception.message
      ? exception.message
      : `${status >= 500 ? `Service Error` : `Client Error`} `;
    const errorResponse = {
      data: {},
      message: message,
      code: -1,
    };
    response.status(status);
    response.header('Content-Type', 'application/json; charset=utf-8');
    response.send(errorResponse);
  }
}
