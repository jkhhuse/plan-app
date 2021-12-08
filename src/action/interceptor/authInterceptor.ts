import { authUserInfo } from "@/utils";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@cmss/http-client-rxjs";
import { Observable } from "rxjs";

export class AuthInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // 添加 Authorization header
    const currentUser = authUserInfo.getCurrentUserValue();
    if (currentUser && currentUser.token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${currentUser.token}`,
        },
      });
    }

    return next.handle(request);
  }
}
