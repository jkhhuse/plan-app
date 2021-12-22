import { HttpMessage } from "@/types/index";
import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { PLAN_SERVER } from "@/constants/common";
import { retryBackoff } from "backoff-rxjs";
import { Profile } from "@/types/profile";
import { http } from "@/action";
import { handleError } from "@/action/common/handle";

/**
 *
 * @returns HttpMessage<Profile>
 */
export const getProfileAction = (): Observable<HttpMessage<Profile>> => {
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
