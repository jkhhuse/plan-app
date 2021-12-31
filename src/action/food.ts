import { HttpMessage } from "@/types/index";
import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { http } from "@/action";
import { PLAN_SERVER } from "@/constants/common";
import { retryBackoff } from "backoff-rxjs";
import { handleError } from "@/action/common/handle";
import { Food } from "@/types/food";

/**
 * 搜索食物
 * @param foodName 食物名称
 * @returns
 */
export const searchFoodAction = (foodName: string): Observable<HttpMessage<Food[]>> => {
  const url = PLAN_SERVER + `food/search/${foodName}`;
  return http.get<HttpMessage<Food[]>>(url).pipe(
    retryBackoff({
      maxRetries: 1,
      initialInterval: 4000,
    }),
    catchError(handleError),
  );
};

/**
 * 查看食物详情
 * @param foodUuid 食物 id
 * @returns Food
 */
export const getFoodDescAction = (foodUuid: string): Observable<HttpMessage<Food>> => {
  const url = PLAN_SERVER + `food/find/${foodUuid}`;
  return http.get<HttpMessage<Food>>(url).pipe(
    retryBackoff({
      maxRetries: 1,
      initialInterval: 4000,
    }),
    catchError(handleError),
  );
};
