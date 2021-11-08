import { HttpMessage } from "@/types/index";
import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { http } from "@/action/index";
import { PLAN_SERVER } from "@/constants/common";
import { handleError } from "@/action/common";
import { retryBackoff } from "backoff-rxjs";
import { LoginInfo } from "@/types/auth";

/**
 *
 * @returns HttpMessage<Profile>
 */
export const login = (body: LoginInfo): Observable<HttpMessage<string>> => {
  const url = PLAN_SERVER + `auth/authenticate`;
  return http.post<HttpMessage<string>>(url, body).pipe(
    retryBackoff({
      initialInterval: 4000,
      maxRetries: 1,
      resetOnSuccess: true,
    }),
    catchError(handleError),
  );
};
