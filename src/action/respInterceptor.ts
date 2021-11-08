import { HttpInterceptor, HttpRequest, HttpHandler, HttpResponse, HttpEvent } from "@cmss/http-client-rxjs";
import * as R from "ramda";
import { map, finalize, tap } from "rxjs/operators";
import { Observable } from "rxjs";
import { HttpMessage } from "../types";
import { authUserInfo } from "@/utils";

export class RespInterceptor implements HttpInterceptor {
  private resolveReferences = (event: HttpResponse<HttpMessage<any>>): HttpMessage<any> | null | any => {
    const resBody = event.body;

    //非 2xx 状态码转换
    if (!event.ok) {
      return {
        code: "500",
        data: null,
        message:
          R.path(["body", "message"], event) ||
          R.path(["body", "meta", "message"], event) ||
          event.statusText,
      };
    }

    //没有返回结果
    if (R.isNil(resBody) || R.isEmpty(resBody)) {
      return {
        code: "500",
        data: null,
        message: "返回消息体为空!",
      };
    }

    //如果是Blob类型或者ArrayBuffer，不封装，直接返回
    if (resBody instanceof Blob || resBody instanceof ArrayBuffer) {
      return resBody;
    }

    /**
     * 默认数据格式:
     * {
     *   meta: {
     *     code: 2xx,
     *     message: "xxx"
     *   },
     *   data: xxx
     * }
     *
     * Op 数据格式:
     * {
     *   state： 2xx,
     *   body: {}
     * }
     *
     * ServerApi 数据格式:
     * {
     *   id: -1,
     *   code: 0,
     *   data: {},
     *   message: "xxx",
     *   state: "COMPLETE"
     * }
     *
     * json 数据
     */
    const isStandardType = R.has("meta", resBody) && R.hasPath(["meta", "code"], resBody);
    const isOpType = R.has("body", resBody) && R.has("state", resBody);
    const isServerType = R.has("id", resBody) && R.has("code", resBody) && R.has("state", resBody);
    const isPlainJson = event?.url?.includes(".json");

    if (isStandardType) {
      return {
        code: R.path(["meta", "code"], resBody).includes("200") ? "200" : "500",
        message: R.pathOr("", ["meta", "message"], resBody),
        data: R.path(["data"], resBody),
      };
    } else if (isPlainJson) {
      return {
        code: "200",
        data: resBody,
        message: "json",
      };
    } else if (isOpType) {
      return {
        code: R.path(["state"], resBody) === "OK" ? "200" : "500",
        message: "",
        data: R.path(["body"], resBody),
      };
    } else if (isServerType) {
      return {
        code: "200",
        data: resBody?.data,
        message: resBody?.message,
      };
    } else {
      //返回格式与约定格式不符
      return {
        code: "200",
        data: resBody,
        message: "",
      };
    }
  };

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const currentUser = authUserInfo.getCurrentUserValue();

    const baseHeader = req.headers;
    // .set("X-Requested-With", "XMLHttpRequest")
    // .set("Set-Cookie", "SameSite=none")
    // .set("pragma", "no-cache") ;

    const authReq = req.clone({
      headers:
        currentUser && currentUser?.token
          ? baseHeader.set("Authorization", `Bearer ${currentUser.token}`)
          : baseHeader,
      withCredentials: false,
    });

    const started = Date.now();
    let ok: string;

    return next.handle(authReq as any).pipe(
      map(event => {
        if (event instanceof HttpResponse) {
          event = event.clone({ body: this.resolveReferences(event) });
        }
        return event;
      }),
      tap(
        // 当有返回值的时候，判断为请求成功
        event => (ok = event instanceof HttpResponse ? "succeeded" : ""),
        // 捕捉错误
        error => () => {
          console.log("failed");
        },
      ),
      finalize(() => {
        // 打印日志
        const elapsed = Date.now() - started;
        const msg = `${req.method} "${req.urlWithParams}"
             ${ok} in ${elapsed} ms.`;
        console.log(msg);
      }),
    );
  }
}
