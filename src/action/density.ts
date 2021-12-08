import { HttpMessage } from "@/types/index";
import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { http } from "@/action";
import { PLAN_SERVER } from "@/constants/common";
import { retryBackoff } from "backoff-rxjs";
import { handleError } from "@/action/common/handle";
import { DensityList } from "@/types/density";

/**
 * 获得血值的列表
 * @returns HttpMessage<Profile>
 */
export const getDensityList = (limit: number, size: number): Observable<HttpMessage<DensityList>> => {
  const url = PLAN_SERVER + `density/list/:limit/:size`;
  return http.get<HttpMessage<DensityList>>(url).pipe(
    retryBackoff({
      initialInterval: 4000,
      maxRetries: 1,
      resetOnSuccess: true,
    }),
    catchError(handleError),
  );
};
