import { HttpErrorResponse } from "@cmss/http-client-rxjs";
import { throwError, Observable } from "rxjs";
import { catchError, take } from "rxjs/operators";
import { http } from "..";
import { messageService } from "./messageService";
// import { HttpMessage } from "@/types";

// 用于 rxjs 的错误处理
export const handleError = (error: HttpErrorResponse): Observable<never> => {
  let message = "";
  if (error.error instanceof ErrorEvent) {
    // 用户侧自定义包装错误信息或者网络超时等
    message = "网络超时:" + error.error.message;
  } else {
    // 获得错误的状态码、以及包装了错误的提示信息。
    message = `服务端发生错误: ${error.message}`;
  }
  messageService.sendMessage(message);
  messageService
    .getMessage()
    .pipe(take(1))
    .subscribe((msg: any) => {
      // alert(msg.text);
      // Vue.prototype.$Message.error({
      //   content: msg.text,
      //   duration: 5,
      // });
    });
  // 返回一个 observable 用于 rxjs catch 处理，方便用户自定义 catch 处理方式。
  return throwError(error.error);
};

// 用于 rxjs 的错误处理，不弹出服务端错误的提示框
export const handleErrorWithNoMessage = (error: HttpErrorResponse): Observable<never> => {
  return throwError(error.error);
};

/**
 * 从 json 中获取所需配置文件
 */
export const getExternalService = (): any => {
  const httpOptions = {
    headers: {
      "Content-Type": "application/json",
      responseType: "json",
    },
  };
  const url = "./config/web-config.json";
  return http.get(url, httpOptions).pipe(catchError(handleError));
};
