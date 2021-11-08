import { HttpMessage } from "@/types/index";
import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { http } from "@/action/index";
import { PLAN_SERVER } from "@/constants/common";
import { handleError } from "@/action/common";
import { retryBackoff } from "backoff-rxjs";
import { Profile } from "@/types/profile";

/**
 *
 * @returns HttpMessage<Profile>
 */
export const getProfile = (): Observable<HttpMessage<Profile>> => {
  const url = PLAN_SERVER + `person/findUserInfo`;
  return http.get<HttpMessage<Profile>>(url).pipe(
    retryBackoff({
      initialInterval: 4000,
      maxRetries: 1,
      resetOnSuccess: true,
    }),
    catchError(handleError),
  );
};
