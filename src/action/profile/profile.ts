import { HttpMessage } from "@/types/index";
import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { http } from "@/action/index";
import { PLAN_SERVER } from "@/constants/common";
import { handleError } from "@/action/common";
import { retryBackoff } from "backoff-rxjs";
import { HttpParams } from "@cmss/http-client-rxjs";

/**
 * 
 * @returns HttpMessage<String>
 */
export const getMetadataTree = (): Observable<HttpMessage<string>> => {
  const url = PLAN_SERVER + `tree`;
  return http.get<HttpMessage<string>>(url).pipe(
    retryBackoff({
      initialInterval: 4000,
      maxRetries: 1,
      resetOnSuccess: true,
    }),
    catchError(handleError),
  );
};
