import { CurrentUserType, HttpMessage } from "@/types/index";
import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { http } from "@/action";
import { PLAN_SERVER } from "@/constants/common";
import { retryBackoff } from "backoff-rxjs";
import { LoginInfo } from "@/types/auth";
import { handleError } from "@/action/common/handle";

/**
 *
 * @returns HttpMessage<Profile>
 */
export const loginAction = (body: LoginInfo): Observable<HttpMessage<CurrentUserType>> => {
  const url = PLAN_SERVER + `auth/authenticate`;
  return http.post<HttpMessage<CurrentUserType>>(url, body).pipe(
    retryBackoff({
      initialInterval: 4000,
      maxRetries: 1,
      resetOnSuccess: true,
    }),
    catchError(handleError),
  );
};
